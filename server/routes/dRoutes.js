const express = require('express');
const router = express.Router();

// Import controller
const { registerDoctor } = require('../controllers/doctorRegister');

// Doctor registration route
router.post('/register', registerDoctor);

module.exports = router;
