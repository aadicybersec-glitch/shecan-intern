import jwt from "jsonwebtoken";

export const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || "shecan_fallback_jwt_secret_key_2026";
  return jwt.sign({ id }, secret, {
    expiresIn: "30d" // 30 days admin persistence
  });
};

export default generateToken;
