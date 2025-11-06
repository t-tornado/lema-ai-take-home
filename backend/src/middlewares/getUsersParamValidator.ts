import { NextFunction, Request, Response } from "express";
import { ServerError } from "../types";

export const getUsersParamValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pageNumber = Number(req.query.pageNumber) || 0;
  const errors: ServerError[] = [];

  if (pageNumber < 0) {
    errors.push({
      type: "validation",
      field: "pageNumber",
      code: "invalid",
      message: "Page number is invalid. Must be greater than or equal to 0",
    });
  }

  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }

  next();
};
