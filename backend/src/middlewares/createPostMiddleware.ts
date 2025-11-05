import { NextFunction, Request, Response } from "express";

export const validateCreatePostPayloadMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload = req.body ?? {};
  if (!payload.title || !payload.body || !payload.user_id) {
    res.status(400).send({ error: "Title, body and user_id are required" });
    return;
  }
  next();
};
