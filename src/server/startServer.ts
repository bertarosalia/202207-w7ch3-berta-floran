import "../loadEnvironment";
import Debug from "debug";
import chalk from "chalk";
import CustomError from "../utils/CustomError";
import express from "express";

export const app = express();

const debug = Debug("robositos:server:startServer");
export const startServer = (port: number) => {
  const promise = new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(`Server listening on http://localhost:${port}`);
      resolve(true);
    });

    server.on("error", (error: CustomError) => {
      debug(chalk.red("Error starting the server"));
      if (error.code === "EADDRINUSE") {
        debug(chalk.red(`Port ${port} in use`));
        reject(error);
      }
    });
  });
  return promise;
};
export default startServer;
