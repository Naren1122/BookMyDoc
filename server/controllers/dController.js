const Doctor = require("../models/Doctor");

// Delete doctor account
const deleteDoctorAccount = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor does not exist" });
    }

    // Optional: Only allow doctor themselves or admin to delete
    if (req.user.role !== "admin" && req.user.id !== doctor._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await doctor.deleteOne();
    res.status(200).json({ success: true, message: "Doctor account deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { deleteDoctorAccount };
