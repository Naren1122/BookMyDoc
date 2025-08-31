const mongoose = require("mongoose"); // Import mongoose for MongoDB

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Use mongoose.connect to establish connection
    //Marks the function as asynchronous so you can use await inside it.

//Connecting to a database is an I/O operation, meaning it may take some time to complete.

//Using async/await makes the code read like synchronous code, easier to understand, instead of using .then() callbacks. 

//Waits for the MongoDB connection to finish before moving to the next line. await

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,   // To handle connection string parsing
      useUnifiedTopology: true // To use the latest server discovery engine
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1); // Exit process if connection fails
  }
};
//We catch the error to log it and exit the process gracefully instead of leaving the app in an unstable state. so use error handling

module.exports = connectDB;
