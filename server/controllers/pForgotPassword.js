const Patient = require("../models/Patient");
const crypto = require("crypto");

const forgotPassword = async (req, res) => {
  const { phone } = req.body;

  const patient = await Patient.findOne({ phone });
  if (!patient) return res.status(404).json({ success: false, message: "Patient not found" });

  // Get reset token
  const resetToken = patient.getResetPasswordToken();
  await patient.save({ validateBeforeSave: false });

  // Normally, send this token via SMS
  res.status(200).json({
    success: true,
    message: "Reset token generated",
    resetToken,
  });
};

module.exports = forgotPassword;
