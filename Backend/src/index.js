import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

// Start server even if MongoDB connection fails (for development)
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`CORS enabled for: http://localhost:5173`);
  });
};

// Try to connect to MongoDB
if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB connected");
      startServer();
    })
    .catch((err) => {
      console.error("DB connection failed:", err.message);
      console.log("Starting server without database connection...");
      startServer();
    });
} else {
  console.warn("MONGO_URI not found in environment variables");
  console.log("Starting server without database connection...");
  startServer();
}
