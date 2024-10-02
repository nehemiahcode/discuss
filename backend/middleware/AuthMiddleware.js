import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import { configDotenv } from "dotenv";

configDotenv();


export const verifyUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Expecting a Bearer token

  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized user' });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findById(decoded.id); // Find user by decoded token ID

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    req.user = user; // Set user in request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};
