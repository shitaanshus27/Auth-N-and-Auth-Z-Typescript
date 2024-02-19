import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Response, Request, NextFunction } from "express";
dotenv.config();

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader;
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err || !payload || typeof payload === "string") {
        // If there's an error or the payload is invalid, send a 403 response
        return res.sendStatus(403);
      }

      req.headers["userId"] = payload.id;
      req.headers["accountType"] = payload.accountType;
      req.headers["userEmail"] = payload.email;

      next();
    });
  } else {
    res.sendStatus(401);
  }
};

export const isStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accountType = req.headers["accountType"];

    if (accountType != "STUDENT") {
      res.status(401).json({
        success: false,
        message: "Yeh Student ke liye hai sir",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
    });
  }
};

export const isInstructor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accountType = req.headers["accountType"];

    if (accountType != "Instructor") {
      res.status(401).json({
        success: false,
        message: "Bakchodi Mat Kar Sir hun main",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
    });
  }
};
