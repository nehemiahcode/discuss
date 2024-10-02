import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
configDotenv();

export const createSecretToken = (user) => {
  return jwt.sign(user, process.env.TOKEN_KEY, { expiresIn: "10h" });
};
