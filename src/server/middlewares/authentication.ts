import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { Error } from "mongoose";
import { CustomRequest, verifyToken } from "../../utils/auth";
import CustomError from "../../utils/CustomError";

const authentication = (req: Request, res: Response, next: NextFunction) => {
  const dataAutentication = req.get("Autorization");
  const error = new CustomError(400, "Bad request", "Error athentication");

  if (!dataAutentication || dataAutentication.startsWith("Bearer")) {
    next(error);
    return;
  }
  const token = dataAutentication.slice(7);
  const verifyTokenData = verifyToken(token);
  if (typeof verifyTokenData === "string") {
    next(Error);
  }
  (req: CustomRequest).payload = verifyTokenData as JwtPayload;
  next();
};
