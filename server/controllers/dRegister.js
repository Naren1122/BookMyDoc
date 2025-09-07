// server/controllers/dRegister.js
const Doctor = require("../models/Doctor");

// ----------------------------
// Register a new doctor
// ----------------------------
const registerDoctor = async (req, res) => {
  try {
    console.log("🚀 Doctor registration request body:", req.body);

    const { name, email, password, gender, speciality, license } = req.body;

    // 1️⃣ Validate required fields
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "Name, email, password, and phone are required" });
    }

    // 2️⃣ Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: "Doctor with this email already exists" });
    }

    // 3️⃣ Create doctor
    const doctor = await Doctor.create({
      name,
      phone,
      email,
      password, // Will be hashed automatically via pre-save hook
      approved: false, // Default pending approval
    });

    console.log("✅ Doctor created:", doctor._id);

    // 4️⃣ Success response
    res.status(201).json({
      message: "Registration successful, pending admin approval",
      doctor: {
        id: doctor._id,
        name: doctor.name,
        phone: doctor.phone,
        email: doctor.email,
        approved: doctor.approved,
      },
    });
  } catch (err) {
    console.error("❌ Doctor registration error:", err.message);

    // Handle duplicate key error separately (if email already exists in DB)
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already registered" });
    }

    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { registerDoctor };