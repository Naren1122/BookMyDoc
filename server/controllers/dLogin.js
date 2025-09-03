const Doctor = require("../models/Doctor");
const jwt = require("jsonwebtoken");

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await Doctor.findOne({ email });
    if (!doctor) return res.status(401).json({ message: "Invalid credentials" });

    // Check if approved by admin
    if (!doctor.approved)
      return res.status(403).json({ message: "Account pending approval" });

    // Compare password using model method
    const isMatch = await doctor.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: doctor._id, role: "doctor" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      doctor: { id: doctor._id, name: doctor.name, email: doctor.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { loginDoctor };
