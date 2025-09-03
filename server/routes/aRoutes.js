const express = require("express");
const router = express.Router();
const { loginAdmin,approveDoctor } = require("../controllers/aController");

// Admin login route (POST only)
router.post("/login", loginAdmin);
router.post("/approve-doctor/:id", approveDoctor);


module.exports = router;
