// server/middleware/authMiddleware.js

const jwt = require("jsonwebtoken");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Admin = require("../models/Admin");

/**
 * Middleware to protect routes using JWT
 * Checks Authorization header for token
 * Decodes token and attaches user info to req.user
 */
const protect = async (req, res, next) => {
  let token;

  // Check for token in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const { id, role } = decoded;

      // Fetch user from DB based on role
      if (role === "patient") req.user = await Patient.findById(id).select("-password");
      if (role === "doctor") req.user = await Doctor.findById(id).select("-password");
      if (role === "admin") req.user = await Admin.findById(id).select("-password");

      // If no user found
      if (!req.user) return res.status(401).json({ message: "User not found" });

      next(); // Proceed to controller
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
};

/**
 * Middleware for role-based access control
 * Accepts allowed roles as arguments
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Check if user's role is included in allowed roles
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "User role not authorized" });
    }

    next(); // User is authorized
  };
};

module.exports = { protect, authorize };
