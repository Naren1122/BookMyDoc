const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("🚀 Server is running and DB is connected!");
});


// Use patient routes for all /api/patients requests
app.use('/api/patients', require('./routes/pRoutes'));

// Use doctor routes for all /api/doctors requests
app.use('/api/doctors', require('./routes/dRoutes'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
