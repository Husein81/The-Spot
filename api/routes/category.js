import express from 'express';
import { createCategory, deleteCategory, getCategories, updateCategory } from '../controller/category.js';
import { authorizedRoles, isAuthenticatedUser } from '../middleware/auth.js';

const router  = express.Router();

router.get('/', getCategories);
router.post('/',isAuthenticatedUser, authorizedRoles, createCategory);
router.put('/', isAuthenticatedUser, authorizedRoles, updateCategory);
router.delete('/', isAuthenticatedUser, authorizedRoles, deleteCategory);
export default router;