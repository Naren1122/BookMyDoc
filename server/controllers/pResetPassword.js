const Patient = require("../models/Patient");
const crypto = require("crypto");

const resetPassword = async (req, res) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const patient = await Patient.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!patient) return res.status(400).json({ success: false, message: "Invalid or expired token" });

  patient.password = req.body.password;
  patient.resetPasswordToken = undefined;
  patient.resetPasswordExpire = undefined;

  await patient.save();

  res.status(200).json({ success: true, message: "Password reset successfully" });
};

module.exports = resetPassword;
