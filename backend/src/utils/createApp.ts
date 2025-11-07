import express, { json, Express } from "express";
import { AppConfig, AppRoutes } from "../types";

/**
 *
 * @param routes
 * @param config
 * @returns
 * factory method to dynamically create express app with different configs
 */
export const createExpressApp = (routes: AppRoutes, config: AppConfig) => {
  const app = express();

  app.use(json());
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  Object.entries(routes).forEach(([path, router]) => {
    app.use(path, router);
  });

  const start = (app: Express) => {
    app.listen(config.port, () => {
      if (config.startMessage) {
        console.log(config.startMessage(config.port));
        return;
      }
      console.log(`API server is running on port ${config.port}`);
    });
  };

  return {
    start,
    app,
  };
};
