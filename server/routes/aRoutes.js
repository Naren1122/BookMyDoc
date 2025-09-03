const express = require("express");
const router = express.Router();
const { loginAdmin, approveDoctor, deletePatientByAdmin, deleteDoctorByAdmin } = require("../controllers/aController");

// Admin login
router.post("/login", loginAdmin);

// Approve doctor
router.put("/approve-doctor/:id", approveDoctor);

// Admin delete patient
router.delete("/delete-patient/:id", deletePatientByAdmin);

// Admin delete doctor
router.delete("/delete-doctor/:id", deleteDoctorByAdmin);

module.exports = router;
