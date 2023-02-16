import { Request, Response, NextFunction } from "express";
import { QueryConfig, QueryResult } from "pg";
import { iUserResult } from "./../interfaces/users.interfaces";
import { client } from "./../database/index";
import { AppError } from "./../errors";

export const checkEmail = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const email = request.body.email;

  const queryString: string = `
    SELECT * FROM users WHERE email = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [email],
  };

  const queryResult: QueryResult<iUserResult> = await client.query(
    queryConfig
  );

  if (queryResult.rowCount > 0) {
    throw new AppError("E-mail already registered!", 409);
  }

  next();
};
