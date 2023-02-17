import { AppError } from "./../errors";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const validateToken = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const token = request.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new AppError("Missing Bearer Token", 401);
  }

  return verify(
    token,
    String(process.env.SECRET_KEY),
    (error: any, decoded: any) => {
      if (error) {
        return response.status(401).json({ message: error.message });
      }

      request.user = { email: decoded.email };
      return next();
    }
  );
};
