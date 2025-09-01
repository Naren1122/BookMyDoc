const express = require("express");
const router = express.Router();
const { loginPatient } = require('../controllers/pLogin');
const { registerPatient } = require('../controllers/pRegister');

// for registertation 
router.post('/register',registerPatient);

// for login
router.post('/login',loginPatient);
module.exports = router;