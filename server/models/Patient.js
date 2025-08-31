const mongoose = require("mongoose"); // Import mongoose for MongoDB schema creation

// Define the schema for patients
const patientSchema = new mongoose.Schema({
  name: { 
    type: String,       // Name of the patient
    required: true
  },
  email: { 
    type: String,       // Patient's email
    required: true, 
    unique: true
  },
  password: { 
    type: String,       // Hashed password for login
    required: true 
  },
  phone: { 
    type: String        // Optional phone number
  }
}, { 
  timestamps: true       // Automatically adds createdAt and updatedAt fields
});

// Export the model so we can use it in controllers
module.exports = mongoose.model("Patient", patientSchema);
