const Doctor = require("../models/Doctor");
const crypto = require("crypto");

// Reset password
const resetPassword = async (req, res) => {
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

  try {
    const doctor = await Doctor.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!doctor) return res.status(400).json({ success: false, message: "Invalid or expired token" });

    doctor.password = req.body.password;
    doctor.resetPasswordToken = undefined;
    doctor.resetPasswordExpire = undefined;

    await doctor.save();

    res.status(200).json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = resetPassword;
