import express from 'express';
import { deleteUser, getUser, getUserProfile, getUsers, updateUser, updateUserProfile } from '../controller/user.js';

const router = express.Router();

//admin
router.route("/").get(getUsers);
router.route("/:id")
    .get(getUser)
    .delete(deleteUser)
    .put(updateUser);

//client
router.route("/profile")
    .get(getUserProfile)
    .put(updateUserProfile);

export default router;