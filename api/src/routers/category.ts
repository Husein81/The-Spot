// global imports
import express from "express";

// local imports
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/category.js";
import { authorizedRoles, protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getCategories);
router.get("/:id", getCategoryById);

router.post("/", protect, authorizedRoles, createCategory);
router.put("/:id", protect, authorizedRoles, updateCategory);
router.delete("/:id", protect, authorizedRoles, deleteCategory);

export default router;
