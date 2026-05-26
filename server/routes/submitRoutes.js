import express from "express";
import { createSubmission, getSubmissions, deleteSubmission } from "../controllers/submitController.js";
import { protect } from "../middleware/authMiddleware.js";
import { submitLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

// Public route to submit contact messages, guarded by anti-spam submitLimiter
router.post("/", submitLimiter, createSubmission);

// Secure administrative routes (get all submissions, delete specific submission)
router.get("/", protect, getSubmissions);
router.delete("/:id", protect, deleteSubmission);

export default router;
