const express = require("express");
const router = express.Router();
const {
  bookAppointment,
  getPatientAppointments,
  getDoctorAppointments,
  cancelAppointment,
  confirmAppointment,
} = require("../../controllers/appointments/bcgg");

const { protect, authorize } = require("../../middleware/authMiddleware");

// Patient books an appointment
router.post("/book", protect, authorize("patient"), bookAppointment);

// Patient views their appointments
router.get("/patient", protect, authorize("patient"), getPatientAppointments);

// Doctor views their appointments
router.get("/doctor", protect, authorize("doctor"), getDoctorAppointments);

// Patient cancels their appointment
router.put("/cancel/:id", protect, authorize("patient"), cancelAppointment);

// Doctor or Admin confirms an appointment
router.patch("/confirm/:id", protect, authorize("doctor", "admin"), confirmAppointment);


module.exports = router;