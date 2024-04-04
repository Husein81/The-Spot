import { StatusCodes } from "http-status-codes";
import {BadRequestError, NotFoundError, UnauthenticatedError} from "../error/index.js";
import asyncHandler from "../middleware/async-handler.js";
import User from '../model/user.js';
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";


export const signup = asyncHandler(async(req, res) => {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ $or: [{ username }, { email }] });
    if(userExists){
        throw new BadRequestError("user already exists");
    }
    
    const user = await User.create({ username, email, password});
    if(!user){
        throw new BadRequestError("Invalid Data")
    }
    
    generateToken(res, user._id);
    res.status(StatusCodes.CREATED).json({ 
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin
     });
});

export const signin = asyncHandler(async(req, res) => {
    const { username, password } = req.body;
    try{
        const user = await User.findOne({ username });
        if(!user){
            throw new NotFoundError("User not found");
        }
        const validatePassword = await bcrypt.compare(password, user.password);
        if(!validatePassword){
            throw new UnauthenticatedError("Invalid Credentials!");
        }
        generateToken(res, user._id);
        
        const { password:pass, ...rest} = user._doc;
        res.status(StatusCodes.OK).json({ rest });
    }catch (error) {
        console.log(error)
    }

});

export const signout = asyncHandler(async(req, res, next) => {
    try{
        res.clearCookie('jwt');
        res.status(StatusCodes.OK).json("User has been logged out!");
    }catch (error){
        next(error);
    }
})