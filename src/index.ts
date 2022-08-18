import express from "express";
import morgan from "morgan";
import cors from "cors";
import robotsRouter from "./server/routers/robotsRouter";
import usersRouter from "./server/routers/usersRouters";
import { generalError, notFoundError } from "./server/middlewares/errors";
import connectDB from "./database";
import "./loadEnvironment";
import { app, startServer } from "./server/startServer";

const port = +process.env.PORT || 4000;
const mongoURL = process.env.MONGODB_URL;

(async () => {
  try {
    await connectDB(mongoURL);
    await startServer(port);
  } catch (error) {
    process.exit(1);
  }
})();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/robots", robotsRouter);
app.use("/users", usersRouter);

app.use(notFoundError);
app.use(generalError);

export default app;
