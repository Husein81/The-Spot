import jwt from "jsonwebtoken";
import { Response } from "express";

const generateToken = (res: Response, userId: string) => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET environment variable is not defined");
  }
  const token = jwt.sign({ id: userId }, jwtSecret, {
    expiresIn: "1d",
  });
  const OneDay = 24 * 60 * 60 * 1000;
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: OneDay,
  });
};

export default generateToken;
