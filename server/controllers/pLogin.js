const Patient = require('../models/Patient');
const jwt = require('jsonwebtoken');

const loginPatient = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if patient exists by email
    const patient = await Patient.findOne({ email });

    if (!patient) {
      // Email doesn't exist → "Patient does not exist"
      return res.status(404).json({ message: 'Patient does not exist' });
    }

    // Check password
    const isMatch = await patient.comparePassword(password);

    if (!isMatch) {
      // Password wrong → "Invalid password"
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Everything correct → generate JWT
    const token = jwt.sign(
      { id: patient._id, role: 'patient' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      patient: { id: patient._id, name: patient.name, email: patient.email },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { loginPatient };
