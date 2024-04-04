import { UnauthenticatedError } from "../error/index.js";
import asyncHandler from "./async-handler.js";
import jwt from 'jsonwebtoken';
import User from "../model/user.js";

export const isAuthenticatedUser = asyncHandler(async(req, res, next) => {
    
    const token = req.cookies.jwt;   
    if(!token){
        throw new UnauthenticatedError('No Token');
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    }catch(error){
        throw new UnauthenticatedError('Login first to access this resource')
    }
})

export const authorizedRoles = (req, res, next) =>{
    if(!req.user || !req.user.isAdmin){
        throw new UnauthenticatedError(`Role (${req.user.isAdmin}) is not allowed to access this resource`)
    }
    next();
}
