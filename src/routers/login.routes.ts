import { userLoginSchema } from "./../schemas/user";
import { validateBody } from "./../middlewares/validateBody";
import { loginController } from "./../controllers/login.controllers";
import { Router } from "express";

export const loginRouter: Router = Router();

loginRouter.post("", validateBody(userLoginSchema), loginController);
