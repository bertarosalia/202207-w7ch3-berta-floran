import "../loadEnvironment";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: "";
  userName: "";
}
export interface CustomRequest extends Request {
  payload: string;
}

export const createToken = (payload: JwtPayload) => {
  return jwt.sign(payload, process.env.SECRET);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.SECRET);
};
