// server/routes/appointments.js

const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../../middleware/authMiddleware");
const {
  bookAppointment,
  cancelAppointment,
  getPatientAppointments,
  getDoctorAppointments,
  confirmAppointment,
} = require("../../controllers/appointments/bcgg");

// -------------------- Appointment Routes -------------------- //

// Book a new appointment (Patient only)
router.post("/book", protect, authorize("patient"), bookAppointment);

// Cancel an appointment (Patient only)
router.delete("/cancel/:id", protect, authorize("patient"), cancelAppointment);

// Get all appointments for the logged-in patient
router.get("/patient", protect, authorize("patient"), getPatientAppointments);

// Get all appointments for the logged-in doctor
router.get("/doctor", protect, authorize("doctor"), getDoctorAppointments);

// Confirm an appointment (Doctor or Admin)
router.put("/confirm/:id", protect, authorize("doctor", "admin"), confirmAppointment);

module.exports = router;
