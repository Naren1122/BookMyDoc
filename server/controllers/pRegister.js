const Patient = require('../models/Patient');
const jwt = require('jsonwebtoken');

const registerPatient = async (req, res) => {
  try {
    // Destructure incoming request body
    const { name, email, password, phone } = req.body;

    // Check if required fields are provided
    if (!name || !email || !password || !phone ) {
      return res.status(400).json({ message: 'Name, email, password, phone are required' });
    }

    // Check if the email is already registered
    const existing = await Patient.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    // Create a new patient document
    const patient = new Patient({ name, email, password, phone });

    // Save patient to DB
    // Password is hashed automatically via pre-save hook in schema
    await patient.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: patient._id, role: 'patient' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' } // Token valid for 7 days
    );

    // Send success response with token and patient info
    res.status(201).json({
      message: 'Patient registered successfully',
      token,
      patient: {
        id: patient._id,
        name: patient.name,
        email: patient.email,
        phone: patient.phone
      }
    });
  } catch (err) {
    // Catch and return server errors
    res.status(500).json({ message: err.message });
  }
};

module.exports = { registerPatient };