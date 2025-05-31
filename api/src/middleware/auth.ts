import { UnauthenticatedError } from "../error/index.js";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma.js";
import { NextFunction, Request, Response } from "express";
import { User } from "../types.js";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies?.jwt;

  if (!token) {
    return next(new UnauthenticatedError("No token provided"));
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as jwt.JwtPayload;

    if (!decoded || !decoded.id) {
      return next(new UnauthenticatedError("Invalid token"));
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return next(new UnauthenticatedError("User not found"));
    }

    req.user = user;
    next();
  } catch (err) {
    return next(new UnauthenticatedError("Invalid or expired token"));
  }
};

const authorizedRoles = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  if (!user || !user.isAdmin) {
    throw new UnauthenticatedError(
      `User is not allowed to access this resource`
    );
  }
  next();
};

export { protect, authorizedRoles };
