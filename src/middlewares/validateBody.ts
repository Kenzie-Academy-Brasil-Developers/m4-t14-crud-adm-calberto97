import { Request, Response, NextFunction } from "express";
import { ZodError, ZodTypeAny } from "zod";

export const validateBody =
  (schema: ZodTypeAny) =>
  (
    request: Request,
    response: Response,
    next: NextFunction
  ): Response | void => {
    const validated = schema.parse(request.body);
    request.body = validated;

    return next();
  };
