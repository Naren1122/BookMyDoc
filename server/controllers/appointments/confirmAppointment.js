const Appointment = require("../../models/Appointment");

// Confirm an appointment (Doctor or Admin)
const confirmAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const user = req.user;

    // Fetch the appointment
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    // Only the doctor of this appointment or admin can confirm
    if (user.role === "doctor" && appointment.doctor.toString() !== user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized to confirm this appointment" });
    }

    appointment.status = "confirmed";
    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Appointment confirmed successfully",
      appointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = confirmAppointment;
