import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import mongoose from "mongoose";

const isDBConnected = () => {
  return mongoose.connection.readyState === 1;
};

// @desc    Authenticate admin & sign JWT token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please supply both email and password." });
  }

  try {
    // 💡 Recruiter Demo Fallback check!
    // If the database is disconnected, we authorize the recruiter directly in-memory!
    if (!isDBConnected()) {
      if (email === "admin@shecan.org" && password === "DemoAccess@2026") {
        const token = `demo_session_${Date.now()}`;
        return res.status(200).json({
          success: true,
          token,
          user: { email: "admin@shecan.org", role: "SuperAdmin", mode: "Demo" }
        });
      } else {
        return res.status(401).json({ message: "Invalid credentials (offline fallback mode active)." });
      }
    }

    // Live Database Authentication Flow
    const user = await User.findOne({ email: email.toLowerCase() });
    if (user && (await user.comparePassword(password))) {
      return res.status(200).json({
        success: true,
        token: generateToken(user._id),
        user: {
          _id: user._id,
          email: user.email,
          role: user.role,
          mode: "Live"
        }
      });
    } else {
      return res.status(401).json({ message: "Invalid email or administrative password." });
    }
  } catch (error) {
    res.status(500).json({ message: "Authentication failed:", error: error.message });
  }
};

// @desc    Get current logged in user details
// @route   GET /api/auth/me
// @access  Private/Admin
export const getMe = async (req, res) => {
  try {
    // req.user was already appended by the 'protect' authMiddleware
    res.status(200).json({
      success: true,
      user: {
        _id: req.user._id,
        email: req.user.email,
        role: req.user.role,
        mode: req.user.mode || "Live"
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Profile load failed:", error: error.message });
  }
};

// 📡 Silent Database Seeder (Proactive Developer Detail!)
// Automatically provisions a default admin account on startup if none exists in live database
export const seedDefaultAdmin = async () => {
  if (!isDBConnected()) return;
  try {
    const adminCount = await User.countDocuments({ email: "admin@shecan.org" });
    if (adminCount === 0) {
      // Provisions default admin
      const defaultAdmin = new User({
        email: "admin@shecan.org",
        password: "DemoAccess@2026", // This will be automatically salted/hashed by User pre-save hook
        role: "SuperAdmin"
      });
      await defaultAdmin.save();
      console.log("🌱 Database Seeding: Admin provisioned successfully ('admin@shecan.org' / 'DemoAccess@2026')");
    } else {
      console.log("🌱 Database Seeding: Default admin record verified.");
    }
  } catch (error) {
    console.error("❌ Database Seeding Failed:", error.message);
  }
};
