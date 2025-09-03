// server/controllers/appointments/bookAppointment.js
const Appointment = require("../../models/Appointment");

// Book a new appointment
const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date } = req.body;

    if (!doctorId || !date)
      return res.status(400).json({ message: "Doctor and date are required" });

    // req.user comes from JWT token after middleware (will be added in Task 3)
    const appointment = await Appointment.create({
      patient: req.user.id, // Patient ID from JWT
      doctor: doctorId,
      date,
      status: "pending",
    });

    res.status(201).json({ message:"Appointment booked successfully",success:true, appointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = bookAppointment;
