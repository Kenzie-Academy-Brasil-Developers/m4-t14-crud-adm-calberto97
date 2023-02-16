import { client } from "./../../database/config";
import { QueryResult } from "pg";
import { iUserResultWithoutPassword } from "./../../interfaces/users.interfaces";
import { Request, Response } from "express";

export const getAllUsersService = async (): Promise<
  iUserResultWithoutPassword[]
> => {
  const queryString: string = `
  SELECT id,
    name,
    email,
    admin,
    active
  FROM users;
    `;

  const queryResult: QueryResult<iUserResultWithoutPassword> =
    await client.query(queryString);

  return queryResult.rows;
};
