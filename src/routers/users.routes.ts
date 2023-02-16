import { checkAdmin } from "./../middlewares/checkAdmin";
import { checkID } from "./../middlewares/checkID";
import {
  userCreationRequestSchema,
  userUpdateRequestSchema,
} from "./../schemas/user";
import {
  deleteUserController,
  getAllUsersController,
  getUserController,
  reactivateUserController,
  updateUserController,
} from "./../controllers/users.controllers";
import { validateToken } from "./../middlewares/validateToken";
import { Router } from "express";
import { createUserController } from "../controllers/users.controllers";
import { validateBody } from "./../middlewares/validateBody";
import { checkEmail } from "./../middlewares/users";

export const userRouter: Router = Router();

userRouter.post(
  "",
  validateBody(userCreationRequestSchema),
  checkEmail,
  createUserController
);
userRouter.get("", validateToken, checkAdmin, getAllUsersController);
userRouter.get("/profile", validateToken, getUserController);
userRouter.patch(
  "/:id",
  checkID,
  validateToken,
  checkAdmin,
  validateBody(userUpdateRequestSchema),
  checkEmail,
  updateUserController
);
userRouter.delete("/:id", checkID, validateToken, checkAdmin, deleteUserController);
userRouter.put("/:id/recover", checkID, validateToken, checkAdmin, reactivateUserController)

