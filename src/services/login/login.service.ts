import { AppError } from "./../../errors";
import { client } from "./../../database/config";
import {
  iUserResult,
  iUserResultWithoutPassword,
} from "./../../interfaces/users.interfaces";
import { QueryConfig, QueryResult } from "pg";
import { iLoginRequest } from "./../../interfaces/login.interfaces";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export const loginService = async (
  payload: iLoginRequest
): Promise<string> => {
  const queryString: string = `
    SELECT * FROM users WHERE email = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [payload.email],
  };

  const queryResult: QueryResult<iUserResult> = await client.query(
    queryConfig
  );

  if (queryResult.rowCount === 0 || !queryResult.rows[0].active) {
    throw new AppError("Invalid email or password!", 401);
  }

  const checkPassword: boolean = await compare(
    payload.password,
    queryResult.rows[0].password
  );

  if (!checkPassword) {
    throw new AppError("Invalid email or password!", 401);
  }

  const token: string = sign(
    { email: payload.email },
    String(process.env.SECRET_KEY),
    { expiresIn: "24h", subject: String(queryResult.rows[0].id) }
  );

  return token;
};
