import User from "../model/user.js";
import { BadRequestError, NotFoundError } from '../error/index.js';
import asyncHandler from "../middleware/async-handler.js";
import { StatusCodes } from "http-status-codes";

// Admin
export const getUsers = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page =Number(req.query.pageNumber) || 1;
  const count = await User.countDocuments();
  const users = await User.find({})
  .select("-password")
  .limit(pageSize)
  .skip(pageSize * (page - 1));
  
  res.status(StatusCodes.OK).json({ users, page, pages:Math.ceil(count/ pageSize) })
});

export const getUser = async (req, res, next) => {
  try {
    
    const user = await User.findById(req.params.id).select("-password");
  
    if (!user){
      throw new NotFoundError("User not found");
    }
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
}; 

export const updateUser = asyncHandler(async (req, res) => {
  const { username, email, password, isAdmin, avatar} = req.body;
  const user = await User.findById(req.params.id);

  if(!user){
    throw new NotFoundError("User not found");
  }

  user.username = username || user.username;
  user.email = email || user.email;
  user.isAdmin = isAdmin || user.isAdmin;
  user.avatar = avatar || user.avatar;
  if(password){
    user.password = password || user.password;
  }

  const updatedUser = await user.save();
  res.status(StatusCodes.OK).json({
    _id: updatedUser._id,
    username: updatedUser.username,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    avatar: updatedUser.avatar
  })
});

export const deleteUser = asyncHandler(async(req, res) => {
  const user = await User.findById(req.params.id);
  if(!user){
    throw new NotFoundError("User not found");
  }
  if(user.isAdmin){
    throw new BadRequestError("Cann't delete admin users");
  }
  await User.deleteOne({ _id: user._id});
  res.status(StatusCodes.OK).json({ message: "User was successfully deleted"});
});

// Client
export const getUserProfile = asyncHandler(async(req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if(!user){
    throw new NotFoundError("User not found");
  }

  res.status(StatusCodes.OK).json({ user });
});

export const updateUserProfile = asyncHandler(async(req, res) => {
  const user = await User.findById(req.user._id);
  const { username, email, password, avatar } = req.body;

  if(!user){
    throw new NotFoundError("User not found");
  }
  user.username = username || user.username;
  user.email = email || user.email;
  user.avatar = avatar || user.avatar;
  if(password){
    user.password = password || user.password;
  }

  const updatedUser = await user.save();
  res.status(StatusCodes.OK).json({
    _id: updatedUser._id,
    username: updatedUser.username,
    email: updatedUser.email,
    avatar: updatedUser.avatar,
    isAdmin: updatedUser.isAdmin
  });

});