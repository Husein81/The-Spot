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
router.get("/:id", getCategory);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);
export default router;
