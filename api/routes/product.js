import express from "express";
import { isAuthenticatedUser, authorizedRoles } from "../middleware/auth.js";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProductByCategory,
  getProducts,
  updateProduct,
} from "../controller/product.js";
const router = express.Router();

router.get("/", getProducts);
router.get("/category/:category", getProductByCategory);
router.get("/:id", getProduct);
router.post("/", isAuthenticatedUser, authorizedRoles, createProduct);
router.put("/:id", isAuthenticatedUser, authorizedRoles, updateProduct);
router.delete("/:id", isAuthenticatedUser, authorizedRoles, deleteProduct);

export default router;
