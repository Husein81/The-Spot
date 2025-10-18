import { Router } from "express";
import { isAdmin } from "../middleware/auth";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product";

const router: Router = Router();
router.get("/", getProducts);
router.get("/:id", getProduct);

router.post("/", isAdmin, createProduct);
router.put("/:id", isAdmin, updateProduct);
router.delete("/:id", isAdmin, deleteProduct);

export default router;
