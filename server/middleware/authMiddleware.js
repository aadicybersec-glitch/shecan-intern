import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // 💡 Recruiter Demo Fallback check!
      if (token.startsWith("demo_session_")) {
        req.user = { _id: "demo_admin", email: "admin@shecan.org", role: "SuperAdmin", mode: "Demo" };
        return next();
      }

      // Real JWT verification
      const secret = process.env.JWT_SECRET || "shecan_fallback_jwt_secret_key_2026";
      const decoded = jwt.verify(token, secret);

      // Find user in database, excluding password hash from load payload
      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        return res.status(401).json({ message: "Not authorized: User record deleted." });
      }

      next();
    } catch (error) {
      console.error("Cryptographic verification check failed:", error.message);
      return res.status(401).json({ message: "Not authorized: Invalid decryption token." });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized: No cryptographic token supplied." });
  }
};

export default protect;
