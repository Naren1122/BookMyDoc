const Patient = require('../models/Patient');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../utils/jwtConfig');

const loginPatient = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if patient exists
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(404).json({ message: 'Patient does not exist' });
    }

    // Verify password
    const isMatch = await patient.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // JWT with role-based expiration
    const expiresIn = jwtConfig["patient"];
    const token = jwt.sign(
      { id: patient._id, role: 'patient' },
      process.env.JWT_SECRET,
      { expiresIn }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      role: "patient",
      expiresIn,
      patient: { id: patient._id, name: patient.name, email: patient.email },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { loginPatient };
