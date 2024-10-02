// auth.routes.js
import express from "express";
import {
  getAllUsers,
  getUser,
  loginUser,
  logoutUser,
  signUpUser,
  updateUser,
} from "../controllers/user.controler.js";
import { verifyUser } from "../middleware/AuthMiddleware.js";


const router = express.Router();


router.post("/signup", signUpUser);
router.post("/login", loginUser);

router.post("/logout", verifyUser, logoutUser);
router.put("/update/:userId", verifyUser, updateUser);
router.get("/:id", verifyUser, getUser);
router.get("/", getAllUsers);

export default router;
