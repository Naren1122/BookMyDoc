const Doctor = require("../models/Doctor");
const crypto = require("crypto");

// Doctor forgot password
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const doctor = await Doctor.findOne({ email });
    if (!doctor) return res.status(404).json({ success: false, message: "Doctor does not exist" });

    // Generate reset token
    const resetToken = doctor.getResetPasswordToken();
    await doctor.save({ validateBeforeSave: false });

    // Return token for testing
    res.status(200).json({
      success: true,
      message: "Reset password token generated. Please check your email.",
      resetToken
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = forgotPassword;
