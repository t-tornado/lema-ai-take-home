import { Router, Request, Response } from "express";

import { getUserByUserId, getUsers, getUsersCount } from "../db/users/users";
import { createIdValidatorMiddleware } from "../middlewares/createIdValidatorMiddleware";
import { getUsersParamValidator } from "../middlewares/getUsersParamValidator";

const router = Router();

router.get("/", getUsersParamValidator, async (req: Request, res: Response) => {
  const pageNumber = Number(req.query.pageNumber) || 0;
  const pageSize = Number(req.query.pageSize) || 4;
  const users = await getUsers(pageNumber, pageSize);
  res.send(users);
});

router.get("/count", async (req: Request, res: Response) => {
  const count = await getUsersCount();
  res.send({ count });
});

router.get(
  "/:userId",
  createIdValidatorMiddleware((req) => req.params.userId),
  async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const user = await getUserByUserId(userId);
    if (!user) {
      res.status(404).json({
        errors: [
          {
            field: "user_id",
            code: "not_found",
            message: "User not found",
          },
        ],
      });
      return;
    }
    res.send({ status: "success", data: user });
  }
);
export default router;
