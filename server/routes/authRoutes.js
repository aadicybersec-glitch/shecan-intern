import express from "express";
import { loginUser, getMe } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { loginLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

// Public login endpoint protected by request throttle limiter
router.post("/login", loginLimiter, loginUser);

// Secure session profile check route guarded by JWT protect
router.get("/me", protect, getMe);

export default router;
