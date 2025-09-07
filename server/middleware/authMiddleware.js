const jwt = require("jsonwebtoken");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Admin = require("../models/Admin");

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { id, role } = decoded;

      if (role === "patient") req.user = await Patient.findById(id).select("-password");
      if (role === "doctor") req.user = await Doctor.findById(id).select("-password");
      if (role === "admin") req.user = await Admin.findById(id).select("-password");

      if (!req.user) return res.status(401).json({ message: "User not found" });

      // Attach role explicitly
      req.user.role = role;

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "User role not authorized" });
    }

    next();
  };
};

module.exports = { protect, authorize };
