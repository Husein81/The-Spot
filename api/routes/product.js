import express from "express";
import { isAuthenticatedUser, authorizedRoles } from '../middleware/auth.js';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controller/product.js";
const router = express.Router();

router.post('/', isAuthenticatedUser, authorizedRoles, createProduct);
router.get('/', getProducts);
router.get('/:id', getProduct);
router.put('/:id', isAuthenticatedUser, authorizedRoles, updateProduct);
router.delete('/:id', isAuthenticatedUser, authorizedRoles, deleteProduct);

export default router;