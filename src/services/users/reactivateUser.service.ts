import { AppError } from "./../../errors";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import { iUserResultWithoutPassword } from "../../interfaces/users.interfaces";

export const reactivateUserService = async (
  id: number
): Promise<any> => {
  let queryString: string = `
  SELECT *
  FROM users
  WHERE id = $1;`;

  let queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  let queryResult: QueryResult<iUserResultWithoutPassword> =
    await client.query(queryConfig);

  if (queryResult.rows[0].active) {
    throw new AppError("User already active");
  }

  queryString = `
    UPDATE users
    SET active = true
    WHERE id = $1;   
    `;

  queryConfig = {
    text: queryString,
    values: [id],
  };

  await client.query(queryConfig);

  queryString = `
  SELECT id,
    name,
    email,
    admin,
    active
  FROM users
  WHERE id = $1;`;

  queryConfig = {
    text: queryString,
    values: [id],
  };

  queryResult = await client.query(queryConfig);

  return queryResult.rows[0];
};
