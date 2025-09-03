const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/Doctor");

/**
 * @desc Create or update default admin user
 * @usage Called when server starts
 */
const createDefaultAdmin = async () => {
  try {
    // Check if admin exists
    let admin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });

    if (!admin) {
      // Hash password
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

      // Create new admin
      admin = await Admin.create({
        name: process.env.ADMIN_NAME,
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
      });

      console.log("✅ Default admin created successfully");
    } else {
      // Optional: Update password to match .env (for development/testing)
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      admin.password = hashedPassword;
      await admin.save();
      console.log("✅ Admin exists: password updated to match .env");
    }
  } catch (err) {
    console.error("❌ Error creating/updating admin:", err.message);
  }
};

/**
 * @desc Login admin
 */
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Invalid Email" });

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid Password" });

    // Generate JWT
    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


//approve a doctor

const approveDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;

    // Find the doctor by ID
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    // Update approval status
    doctor.approved = true;
    await doctor.save();

    res.status(200).json({
      message: `Doctor ${doctor.name} has been approved successfully`,
      doctor: {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        approved: doctor.approved
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { createDefaultAdmin, loginAdmin, approveDoctor };
