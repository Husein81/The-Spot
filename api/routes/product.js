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
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
