import { NextFunction, Response } from "express";
import { CustomRequest, JwtPayload, verifyToken } from "../../utils/auth";
import CustomError from "../../utils/CustomError";

export const authentication = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const dataAutentication = req.get("Authorization");
  const error = new CustomError(400, "Bad request", "Error athentication");

  if (!dataAutentication || dataAutentication.startsWith("Bearer")) {
    next(error);
    return;
  }
  const token = dataAutentication.slice(7);
  const verifyTokenData = verifyToken(token);
  if (typeof verifyTokenData === "string") {
    next(error);
  }
  req.payload = verifyTokenData as JwtPayload;
  next();
};
