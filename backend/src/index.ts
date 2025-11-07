import config from "config";
import { createExpressApp } from "./utils/createApp";
import { routes } from "./routes";
const port = config.get("port") as number;

const { app, start } = createExpressApp(routes, { port });

start(app);
