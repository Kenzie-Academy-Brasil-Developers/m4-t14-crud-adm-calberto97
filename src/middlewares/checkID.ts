import { client } from "./../database/config";
import { iUserResultWithoutPassword } from "./../interfaces/users.interfaces";
import { Request, Response, NextFunction } from "express";
import { QueryConfig, QueryResult } from "pg";
import { AppError } from "../errors";

export const checkID = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id = +request.params.id;

  const queryString: string = `
        SELECT *
        FROM users
        WHERE id = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<iUserResultWithoutPassword> =
    await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    throw new AppError(`User with id ${id} not found`, 404);
  }

  next();
};
