const Doctor = require("../models/Doctor");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../utils/jwtConfig");

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await Doctor.findOne({ email });
    if (!doctor) return res.status(404).json({ message: "Doctor does not exist" });

    // Check if approved by admin
    if (!doctor.approved)
      return res.status(403).json({ message: "Account pending approval" });

    // Compare password
    const isMatch = await doctor.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    // JWT with role-based expiration
    const expiresIn = jwtConfig["doctor"];
    const token = jwt.sign(
      { id: doctor._id, role: "doctor" },
      process.env.JWT_SECRET,
      { expiresIn }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      role: "doctor",
      expiresIn,
      doctor: { id: doctor._id, name: doctor.name, email: doctor.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { loginDoctor };
