import express from "express";

import {
  createProducts,
  deleteProducts,
  getProducts,
  getProductsById,
  updateProducts,
} from "../controllers/products.controler.js";
import { verifyUser } from "../middleware/AuthMiddleware.js";
const router = express.Router();

router.post("/", verifyUser, createProducts);

router.get("/", verifyUser, getProducts);

router.put("/:id", verifyUser, updateProducts);

router.delete("/:id", verifyUser, deleteProducts);

router.get("/:id", verifyUser, getProductsById);

export default router;
