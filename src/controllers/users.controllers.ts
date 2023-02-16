import { reactivateUserService } from "./../services/users/reactivateUser.service";
import { deleteUserService } from "./../services/users/deleteUser.service";
import { updateUserService } from "./../services/users/updateUser.service";
import { getAllUsersService } from "./../services/users/getAllUsers.service";
import { getUserService } from "./../services/users/getUser.service";
import { createUsersService } from "../services/users/createUsers.service";
import { Request, Response } from "express";

export const createUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const user = await createUsersService(request.body);

  return response.status(201).json(user);
};

export const getUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const user = await getUserService(request.user);

  return response.status(200).json(user);
};

export const getAllUsersController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const users = await getAllUsersService();

  return response.status(200).json(users);
};

export const updateUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const id = +request.params.id;
  const updatedUser = await updateUserService(request.body, id);

  return response.status(200).json(updatedUser);
};

export const deleteUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const id = +request.params.id;
  await deleteUserService(id);

  return response.status(204).send();
};

export const reactivateUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const id = +request.params.id;
  const reactivatedUser = await reactivateUserService(id);

  return response.status(200).json(reactivatedUser);
};
