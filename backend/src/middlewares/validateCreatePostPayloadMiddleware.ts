import { NextFunction, Request, Response } from "express";
import { ServerError } from "../types";

export const validateCreatePostPayloadMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload = req.body ?? {};
  if (!payload.title || !payload.body) {
    const errors: ServerError[] = [];
    if (!payload.title) {
      errors.push({
        type: "validation",
        field: "title",
        code: "required",
        message: "Title is required",
      });
    }
    if (!payload.body) {
      errors.push({
        type: "validation",
        field: "body",
        code: "required",
        message: "Body is required",
      });
    }

    res.status(400).json({
      errors,
    });
    return;
  }
  next();
};
