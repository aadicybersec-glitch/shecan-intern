import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import Submission from "../models/Submission.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOCAL_DB_PATH = path.join(__dirname, "../local_database.json");

// Helper to read local JSON database file
const readLocalDB = () => {
  try {
    if (!fs.existsSync(LOCAL_DB_PATH)) {
      return [];
    }
    const data = fs.readFileSync(LOCAL_DB_PATH, "utf-8");
    return JSON.parse(data || "[]");
  } catch (error) {
    console.error("Local JSON DB read error:", error);
    return [];
  }
};

// Helper to write local JSON database file
const writeLocalDB = (data) => {
  try {
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Local JSON DB write error:", error);
  }
};

// Check if mongoose is connected to a live database
const isDBConnected = () => {
  return mongoose.connection.readyState === 1;
};

// @desc    Create new contact submission
// @route   POST /api/submissions
// @access  Public
export const createSubmission = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "Please supply all required contact fields." });
  }

  try {
    if (isDBConnected()) {
      // Live Mongo Write
      const submission = await Submission.create({ name, email, subject, message });
      return res.status(201).json({ success: true, submission });
    } else {
      // Local JSON File Failover Write
      const local = readLocalDB();
      const newSub = {
        _id: `local_${Date.now()}`,
        name,
        email,
        subject,
        message,
        createdAt: new Date().toISOString()
      };
      local.unshift(newSub); // Insert at beginning (newest first)
      writeLocalDB(local);
      return res.status(201).json({ success: true, submission: newSub, note: "Offline Local DB Failover Mode" });
    }
  } catch (error) {
    res.status(500).json({ message: "Ingestion failed:", error: error.message });
  }
};

// @desc    Fetch all contact submissions
// @route   GET /api/submissions
// @access  Private/Admin
export const getSubmissions = async (req, res) => {
  try {
    if (isDBConnected()) {
      // Live Mongo Read
      const submissions = await Submission.find({}).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, submissions });
    } else {
      // Local JSON File Failover Read
      const local = readLocalDB();
      return res.status(200).json({ success: true, submissions: local });
    }
  } catch (error) {
    res.status(500).json({ message: "Fetch failed:", error: error.message });
  }
};

// @desc    Purge contact submission record by ID
// @route   DELETE /api/submissions/:id
// @access  Private/Admin
export const deleteSubmission = async (req, res) => {
  const { id } = req.params;

  try {
    if (isDBConnected() && !id.startsWith("local_") && !id.startsWith("seed_")) {
      // Live Mongo Purge
      const submission = await Submission.findById(id);
      if (!submission) {
        return res.status(404).json({ message: "Submission record not found." });
      }
      await Submission.findByIdAndDelete(id);
      return res.status(200).json({ success: true, message: "Record purged successfully." });
    } else {
      // Local JSON File Failover Purge
      const local = readLocalDB();
      const filtered = local.filter((s) => s._id !== id);
      writeLocalDB(filtered);
      return res.status(200).json({ success: true, message: "Local mock record purged successfully." });
    }
  } catch (error) {
    res.status(500).json({ message: "Purge operation failed:", error: error.message });
  }
};
