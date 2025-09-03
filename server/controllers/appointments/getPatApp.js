// server/controllers/appointments/getPatientAppointments.js
const Appointment = require("../../models/Appointment");

// Get all appointments for the logged-in patient
const getPatientAppointments = async (req, res) => {
  try {
    const patientId = req.user._id; // <-- Use JWT authenticated user

    const appointments = await Appointment.find({ patient: patientId })
      .populate("doctor", "name speciality") // Replace doctor ID with doctor info
      .sort({ date: 1 }); // Sort by date ascending

    res.status(200).json({message:"Patient appointments fetched successfully", success: true, appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = getPatientAppointments;
