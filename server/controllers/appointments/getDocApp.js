const Appointment = require("../../models/Appointment");

// Get appointments for the logged-in doctor
const getDoctorAppointments = async (req, res) => {
  try {
    // req.user is set by protect middleware
    const doctorId = req.user._id;

    // Fetch appointments where doctor matches logged-in doctor
    const appointments = await Appointment.find({ doctor: doctorId })
      .populate("patient", "name email phone") // Include patient info
      .sort({ date: 1 }); // Sort by date ascending

    res.status(200).json({
      message: "Doctor appointments fetched successfully",
      success: true,
      appointments,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = getDoctorAppointments;
