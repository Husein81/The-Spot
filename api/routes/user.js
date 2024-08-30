import express from "express";
import {
  deleteUser,
  getUser,
  getUserProfile,
  getUsers,
  updateUser,
  updateUserProfile,
} from "../controller/user.js";
import { authorizedRoles, isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

//admin
router.route("/").get(isAuthenticatedUser, authorizedRoles, getUsers);
router
  .route("/:id")
  .get(isAuthenticatedUser, authorizedRoles, getUser)
  .delete(isAuthenticatedUser, authorizedRoles, deleteUser)
  .put(isAuthenticatedUser, authorizedRoles, updateUser);

//client
router.route("/profile").get(getUserProfile).put(updateUserProfile);

export default router;
