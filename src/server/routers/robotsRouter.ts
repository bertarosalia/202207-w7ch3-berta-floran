import express from "express";
import { createRobot, getAllRobots } from "../controllers/robotsControllers";

const robotsRouter = express.Router();

robotsRouter.get("/", getAllRobots);
robotsRouter.post("/create", createRobot);

export default robotsRouter;
