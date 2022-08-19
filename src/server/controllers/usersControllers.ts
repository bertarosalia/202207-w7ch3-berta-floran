import { NextFunction, Request, Response } from "express";
import User from "../../database/models/User";
import { createToken, hashCreator, JwtPayload } from "../../utils/auth";
import CustomError from "../../utils/CustomError";

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
export interface UserRegister {
  userName: string;
  password: string;
}

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: UserRegister = req.body;
  user.password = await hashCreator(user.password);

  try {
    const newUser = await User.create(user);
    res.status(200).json({ user: newUser });
  } catch (error) {
    const userError = new CustomError(
      400,
      "Invalid user",
      "Invalid athentication"
    );
    next(userError);
    return;
  }
};
