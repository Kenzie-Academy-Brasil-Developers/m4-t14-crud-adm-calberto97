import { client } from "./../database/config";
import { iUserResultWithoutPassword } from "./../interfaces/users.interfaces";
import { QueryConfig, QueryResult } from "pg";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";

export const checkAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const email = request.user.email;
  const id = +request.params.id;

  const queryString: string = `
        SELECT *
        FROM users
        WHERE email = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [email],
  };

  const queryResult: QueryResult<iUserResultWithoutPassword> =
    await client.query(queryConfig);

  if (queryResult.rows[0].admin) {
    next();
  } else if (id && id === queryResult.rows[0].id) {
    next();
  } else {
    throw new AppError("Insufficient Permission", 403);
  }
};
