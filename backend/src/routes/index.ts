import { AppRoutes } from "../types";
import postsRouter from "./posts";
import usersRouter from "./users";

export const routes: AppRoutes = {
  "/posts": postsRouter,
  "/users": usersRouter,
};
