import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../error/index.js";
import asyncHandler from "../middleware/async-handler.js";
import User from "../model/user.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

export const register = asyncHandler(async (req, res) => {
  const { username, email, password, avatar } = req.body;
  const userExists = await User.findOne({ $or: [{ username }, { email }] });
  if (userExists) {
    throw new BadRequestError("user already exists");
  }

  const user = await User.create({ username, email, password, avatar });
  if (!user) {
    throw new BadRequestError("Invalid Data");
  }

  generateToken(res, user._id);
  res.status(StatusCodes.CREATED).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    isAdmin: user.isAdmin,
  });
});

export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      throw new UnauthenticatedError("Invalid Credentials!");
    }
    generateToken(res, user._id);
    res.status(StatusCodes.OK).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.log(error);
  }
});

export const logout = asyncHandler(async (req, res) => {
  try {
    res.clearCookie("jwt");
    res
      .status(StatusCodes.OK)
      .json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.log(error);
  }
});
