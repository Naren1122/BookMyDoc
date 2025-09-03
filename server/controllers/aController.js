const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient"); // ✅ Import Patient model

/**
 * @desc Create or update default admin user
 */
const createDefaultAdmin = async () => {
  try {
    let admin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });

    if (!admin) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      admin = await Admin.create({
        name: process.env.ADMIN_NAME,
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
      });
      console.log("✅ Default admin created successfully");
    } else {
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
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Invalid Email" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid Password" });

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

/**
 * @desc Approve a doctor
 */
const approveDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    doctor.approved = true;
    await doctor.save();

    res.status(200).json({
      message: `Doctor ${doctor.name} has been approved successfully`,
      doctor: {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        approved: doctor.approved,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc Delete patient by Admin
 */
const deletePatientByAdmin = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    res.json({ success: true, message: "Patient deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

/**
 * @desc Delete doctor by Admin
 */
const deleteDoctorByAdmin = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    res.json({ success: true, message: "Doctor deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

module.exports = { 
  createDefaultAdmin, 
  loginAdmin, 
  approveDoctor, 
  deletePatientByAdmin, 
  deleteDoctorByAdmin 
};
