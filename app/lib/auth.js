import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "dev_secret"; // put real secret in .env later

export function createToken(user) {
  return jwt.sign({ id: user.id, username: user.username }, SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}
