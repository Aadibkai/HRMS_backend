import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const APP_PORT = 8086;

// ✅ Correct CORS setup
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

// ✅ Connect to DB
connectDB();

// ✅ Test route
app.get("/", (req, res) => {
  console.log("Root route hit");
  res.send("ok");
});

// ✅ API Routes
app.use("/api", authRoutes);


// ✅ Start server
app.listen(APP_PORT, () => {
  console.log(`Server is listening on http://localhost:${APP_PORT}`);
});
