import { NextFunction, Request, Response } from "express";
import User from "../../database/models/User";
import { createToken, JwtPayload } from "../../utils/auth";

export interface LoginData {
  userName: string;
  password: string;
}

export const loginUser = (req: Request, res: Response) => {
  const user = req.body as LoginData;

  const payload: JwtPayload = {
    id: "123456",
    userName: user.userName,
  };

  const responseData = {
    user: {
      token: createToken(payload),
    },
  };

  res.status(200).json(responseData);
};

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.body;

  try {
  } catch {
    const newUser = await User.create(user);
  }
};
