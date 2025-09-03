const express = require("express");
const router = express.Router();

// Import controllers
const { registerDoctor } = require("../controllers/dRegister");
const { loginDoctor } = require("../controllers/dLogin");

// Doctor registration route
router.post("/register", registerDoctor);

// Doctor login route
router.post("/login", loginDoctor);

module.exports = router;
