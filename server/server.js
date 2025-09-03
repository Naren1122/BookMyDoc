const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); // MongoDB connection function
const { createDefaultAdmin } = require("./controllers/aController");
const appointmentRoutes = require('./routes/AppointRoutes/appRoutes');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// Connect to MongoDB and then start server
connectDB()
  .then(async () => {
    console.log("✅ MongoDB connected");

    // Seed default admin user
    await createDefaultAdmin();

    // Test route
    app.get("/", (req, res) => {
      res.send("🚀 Server is running and DB is connected!");
    });

    // ================== ROUTES ==================
    app.use("/api/admin", require("./routes/aRoutes")); // Admin routes
    app.use("/api/patients", require("./routes/pRoutes")); // Patient routes
    app.use("/api/doctors", require("./routes/dRoutes")); // Doctor routes

    // ✅ NEW: Appointment routes
    app.use("/api/appointments", appointmentRoutes);
    // ================== START SERVER ==================
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ Failed to connect MongoDB:", err.message);
  });
