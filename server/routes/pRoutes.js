const express = require("express");
const router = express.Router();
const { loginPatient } = require('../controllers/pLogin');
const { registerPatient } = require('../controllers/pRegister');
const { deletePatientAccount } = require("../controllers/pController");
const forgotPassword = require("../controllers/pForgotPassword");
const resetPassword = require("../controllers/pResetPassword");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerPatient);
router.post("/login", loginPatient);
router.delete("/delete/:id", protect, deletePatientAccount);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

module.exports = router;
