const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  specialty: { 
    type: String, 
    default: ""  // Optional for Phase 1
  },
  license: { 
    type: String, 
    default: ""  // Optional for Phase 1
  },
  approved: { 
    type: Boolean, 
    default: false 
  },
}, { 
  timestamps: true 
});

module.exports = mongoose.model("Doctor", doctorSchema);
