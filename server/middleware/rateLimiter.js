import rateLimit from "express-rate-limit";

// Throttling for public message submissions (Spam/DDoS prevention)
export const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Max 10 messages per IP per window
  message: {
    message: "Too many contact submissions from this IP. Please wait 15 minutes before sending another message."
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Throttling for login attempts (Brute force protection)
export const loginLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 15, // Max 15 attempts per IP per window
  message: {
    message: "Too many administrative login attempts. Access locked for 1 hour to prevent brute force."
  },
  standardHeaders: true,
  legacyHeaders: false
});
