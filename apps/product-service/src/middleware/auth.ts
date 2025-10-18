import { getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";
import { CustomJwtSessionClaims } from "@repo/types";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const auth = getAuth(req);
  const userId = auth.userId;

  if (!userId) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  req.userId = userId;

  return next();
};

export const isAdmin =
  () => (req: Request, res: Response, next: NextFunction) => {
    const auth = getAuth(req);
    const userId = auth.userId;

    if (!userId) {
      return res.status(401).send({ message: "Unauthorized!" });
    }

    const claims = auth.sessionClaims as CustomJwtSessionClaims;

    if (claims.metadata?.role !== "admin") {
      return res.status(403).send({ message: "Unauthorized!" });
    }

    req.userId = userId;

    return next();
  };
