import { loginService } from "./../services/login/login.service";
import { Request, Response } from "express";

export const loginController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const token = await loginService(request.body);

  return response.status(200).json({ token: token });
};
