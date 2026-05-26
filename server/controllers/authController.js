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
      if ((email === "admin@shecan.org" || email === "demo@shecan.foundation") && password === "DemoAccess@2026") {
        const token = `demo_session_${Date.now()}`;
        return res.status(200).json({
          success: true,
          token,
          user: { email, role: "SuperAdmin", mode: "Demo" }
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
// Automatically provisions default admin accounts on startup if none exist in live database
export const seedDefaultAdmin = async () => {
  if (!isDBConnected()) return;
  try {
    const adminEmails = ["admin@shecan.org", "demo@shecan.foundation"];
    for (const email of adminEmails) {
      const adminCount = await User.countDocuments({ email });
      if (adminCount === 0) {
        const defaultAdmin = new User({
          email,
          password: "DemoAccess@2026", // Salted & Hashed dynamically by pre-save hooks
          role: "SuperAdmin"
        });
        await defaultAdmin.save();
        console.log(`🌱 Database Seeding: Admin provisioned successfully ('${email}' / 'DemoAccess@2026')`);
      }
    }
    console.log("🌱 Database Seeding: Default admin records verified.");
  } catch (error) {
    console.error("❌ Database Seeding Failed:", error.message);
  }
};
