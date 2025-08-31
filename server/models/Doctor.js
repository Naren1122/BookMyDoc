const mongoose = require("mongoose");

// Doctor schema for Phase 1 (only authentication + approval)
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
  approved: { 
    type: Boolean, 
    default: false      // must be approved by admin before accessing dashboard
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model("Doctor", doctorSchema);
