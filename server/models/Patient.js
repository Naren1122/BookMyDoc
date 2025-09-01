const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For hashing passwords

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  gender: { type: String } // Added gender
}, { timestamps: true });

// ------------------------
// Pre-save hook to hash password
// ------------------------
patientSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); // Only hash if password is new/modified
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ------------------------
// Method to compare password
// ------------------------
patientSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Patient', patientSchema);
