const Patient = require("../models/Patient");

// Delete patient account
const deletePatientAccount = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ success: false, message: "Patient not found" });
    }

    // Ensure the logged-in patient is the same as the one being deleted
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    await Patient.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Patient account deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Correct export
module.exports = { deletePatientAccount };
