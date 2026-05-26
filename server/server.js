import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import submitRoutes from "./routes/submitRoutes.js";
import { seedDefaultAdmin } from "./controllers/authController.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// Load environment configurations
dotenv.config();

const app = express();

// 🔐 Apply Premium Security Headers using Helmet
app.use(helmet());

// 📡 CORS Policy Whitelist setup
const corsOptions = {
  origin: [
    "http://localhost:5173", // Standard Vite Dev Client Port
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    process.env.FRONTEND_URL  // Production deploy url if set
  ].filter(Boolean),
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));

// Ingest JSON request payloads
app.use(express.json());

// API baseline probe route
app.get("/", (req, res) => {
  res.status(200).json({
    status: "Operational",
    message: "She Can Foundation Encrypted MVC REST API",
    timestamp: new Date().toISOString()
  });
});

// Register Core Administrative & Submission Routers
app.use("/api/auth", authRoutes);
app.use("/api/submissions", submitRoutes);

// Register Centralized Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Initialize Database connection, seed default admin, and boot Express engine
const bootstrapServer = async () => {
  const isConnected = await connectDB();
  
  if (isConnected) {
    // Proactively provision administrative credentials if database is active but empty
    await seedDefaultAdmin();
  }

  app.listen(PORT, () => {
    console.log(`🚀 She Can API Server Operating at: http://localhost:${PORT}`);
    console.log(`🛠️ Mode: ${process.env.NODE_ENV || "development"}`);
  });
};

bootstrapServer();
