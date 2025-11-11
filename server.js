// Replace server.js with this
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");

dotenv.config();

const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

// Trust proxy if behind a reverse proxy (Heroku/NGINX) - enables secure cookies, rate limiter uses ip correctly
if (process.env.NODE_ENV === "production" || process.env.DEV_MODE === "production") {
  app.set("trust proxy", 1);
}

app.use(helmet());
app.use(compression());

// Small body size limit to avoid large uploads via JSON payloads (images should be uploaded elsewhere)
app.use(express.json({ limit: "50kb" })); // bump slightly if your blog content is larger
app.use(express.urlencoded({ extended: true, limit: "50kb" }));

// Restrictive CORS: allow FRONTEND_URL or localhost during dev
const FRONTEND = process.env.FRONTEND_URL || "http://localhost:3000";
const corsOptions = {
  origin: (origin, cb) => {
    // allow non-browser requests (like curl) when origin is undefined
    if (!origin) return cb(null, true);
    if (origin === FRONTEND) return cb(null, true);
    return cb(new Error("CORS blocked by server"), false);
  },
  credentials: true,
};
app.use(cors(corsOptions));

// Rate limiter — prevents abuse and reduces load
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 120, // max 120 requests per IP per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests, please try again later." },
});
app.use(limiter);

// Logging in dev
if (process.env.DEV_MODE === "development") app.use(morgan("dev"));

app.get("/", (req, res) => res.send("BlogBase API"));

// API routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

// 404 handler
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

let server;
const start = async () => {
  try {
    // Connect DB once before listen
    await connectDB();

    const port = process.env.PORT || 8080;
    server = app.listen(port, () => {
      console.log(`Server started on ${port}`);
    });
  } catch (err) {
    console.error("Failed to start:", err);
    process.exit(1);
  }
};

// Graceful shutdown
const shutdown = async (signal) => {
  console.log(`Received ${signal}. Closing server and DB connections...`);
  if (server) server.close(() => console.log("HTTP server closed."));
  // If your connectDB exports mongoose connection, close it:
  try {
    const mongoose = require("mongoose");
    await mongoose.connection.close(false);
    console.log("MongoDB connection closed.");
  } catch (err) {
    console.error("Error during DB close", err);
  }
  process.exit(0);
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

start();
