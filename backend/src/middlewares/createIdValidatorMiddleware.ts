import { NextFunction, Request, Response } from "express";
import { idHelper } from "../utils/idHelper";

interface Config {
  field: string;
}

export const createIdValidatorMiddleware = (
  idGetter: (req: Request) => string,
  config?: Config
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const field = config?.field ?? "id";
    const id = idGetter(req);
    if (!id) {
      res.status(404).json({
        errors: [
          {
            type: "not_found",
            field,
            code: "required",
            message: `${field} is required`,
          },
        ],
      });
      return;
    }
    if (!idHelper.validate(id)) {
      res.status(400).json({
        errors: [
          {
            type: "validation",
            field,
            code: "invalid",
            message: `${field} is Invalid`,
          },
        ],
      });
      return;
    }
    next();
  };
};
