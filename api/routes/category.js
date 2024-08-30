import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controller/category.js";
import { authorizedRoles, isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getCategories);
router.get("/:id", isAuthenticatedUser, authorizedRoles, getCategory);
router.post("/", isAuthenticatedUser, authorizedRoles, createCategory);
router.put("/:id", isAuthenticatedUser, authorizedRoles, updateCategory);
router.delete("/:id", isAuthenticatedUser, authorizedRoles, deleteCategory);
export default router;
