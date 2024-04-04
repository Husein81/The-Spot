import User from "../model/user.js";
import { BadRequestError, NotFoundError } from '../error/index.js';
import asyncHandler from "../middleware/async-handler.js";


export const getUser = async (req, res, next) => {
  try {
    
    const user = await User.findById(req.params.id);
  
    if (!user){
        throw new NotFoundError("User not found");
    }
    const { password: pass, ...rest } = user._doc;
  
    res.status(StatusCodes.OK).json(rest);
  } catch (error) {
    next(error);
  }
}; 