import express from "express";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const APP_PORT = 2000;

// ✅ Proper CORS setup
const corsOptions = {
  origin: "http://localhost:3000", // frontend origin
  // credentials: true,
};

app.use(cors(corsOptions)); // 🚨 THIS MUST BE FIRST
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

// Connect to DB
connectDB();

// Routes
app.use("/api", authRoutes);

// Start server
app.listen(APP_PORT, () =>
  console.log(`Server is listening on http://localhost:${APP_PORT}`)
);
