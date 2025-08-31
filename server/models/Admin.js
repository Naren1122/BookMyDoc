const mongoose = require("mongoose");

// Define schema for admin users
const adminSchema = new mongoose.Schema({
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
},
 { 
  timestamps: true 
});

module.exports = mongoose.model("Admin", adminSchema);
