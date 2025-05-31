// global imports
import express from "express";

// Local imports
import {
  createProduct,
  deleteProduct,
  getProducts,
  getProductById,
  updateProduct,
} from "../controllers/product.js";
import { authorizedRoles, protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);

router.post("/", protect, authorizedRoles, createProduct);
router.put("/:id", protect, authorizedRoles, updateProduct);
router.delete("/:id", protect, authorizedRoles, deleteProduct);

export default router;
