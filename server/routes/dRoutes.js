const express = require("express");
const router = express.Router();
const { loginDoctor } = require("../controllers/dLogin");
const { registerDoctor } = require("../controllers/dRegister");
const { deleteDoctorAccount } = require("../controllers/dController");
const { protect } = require("../middleware/authMiddleware");
const forgotPassword = require("../controllers/dForgotPassword");
const resetPassword = require("../controllers/dResetPassword");

// Doctor registration
router.post("/register", registerDoctor);

// Doctor login
router.post("/login", loginDoctor);

// Doctor account deletion
router.delete("/delete/:id", protect, deleteDoctorAccount);

// Doctor forgot password
router.post("/forgot-password", forgotPassword);

// Doctor reset password
router.put("/reset-password/:resetToken", resetPassword);

module.exports = router;
