import "../loadEnvironment";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Request } from "express";
export interface JwtPayload {
  id: string;
  userName: string;
}
export interface CustomRequest extends Request {
  payload: JwtPayload;
}

export const createToken = (payload: JwtPayload) => {
  return jwt.sign(payload, process.env.SECRET);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.SECRET);
};
export const hashCreator = (text: string) => {
  const salt = 10;
  return bcrypt.hash(text, salt);
};
