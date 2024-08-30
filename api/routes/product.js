import express from "express";
import { isAuthenticatedUser, authorizedRoles } from "../middleware/auth.js";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controller/product.js";
const router = express.Router();

router.get("/", getProducts);
router.get("/:id", isAuthenticatedUser, authorizedRoles, getProduct);
router.post("/", isAuthenticatedUser, authorizedRoles, createProduct);
router.put("/:id", isAuthenticatedUser, authorizedRoles, updateProduct);
router.delete("/:id", isAuthenticatedUser, authorizedRoles, deleteProduct);

export default router;
