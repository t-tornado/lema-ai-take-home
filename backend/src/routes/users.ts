import { Router, Request, Response } from "express";

import { getUserByUserId, getUsers, getUsersCount } from "../db/users/users";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const pageNumber = Number(req.query.pageNumber) || 0;
  const pageSize = Number(req.query.pageSize) || 4;
  if (pageNumber < 0 || pageSize < 1) {
    res.status(400).send({ message: "Invalid page number or page size" });
    return;
  }

  const users = await getUsers(pageNumber, pageSize);
  res.send(users);
});

router.get("/count", async (req: Request, res: Response) => {
  const count = await getUsersCount();
  res.send({ count });
});

router.get("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await getUserByUserId(userId);
  if (!user) {
    res.status(404).send({ message: "User not found" });
    return;
  }
  res.send({ status: "success", data: user });
});
export default router;
