import { NextFunction, Request, Response } from "express";
import Robot from "../../database/models/Robot";
import CustomError from "../../utils/CustomError";

export const getAllRobots = async (req: Request, res: Response) => {
  const robots = await Robot.find();

  res.status(200).json({ robots });
};

export const createRobot = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const robot = req.body;

  try {
    const newRobot = await Robot.create(robot);

    res.status(201).json({ robot: newRobot });
  } catch (error) {
    const customError = new CustomError(
      400,
      error.message,
      "Error creating new robot"
    );
    next(customError);
  }
};
