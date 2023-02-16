import { iUserEmail } from "./../../interfaces/users.interfaces";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database/config";
import { iUserResultWithoutPassword } from "../../interfaces/users.interfaces";

export const getUserService = async (
  payload: iUserEmail
): Promise<iUserResultWithoutPassword> => {
  const queryString: string = `
  SELECT id,
    name,
    email,
    admin,
    active
  FROM users
  WHERE email = $1;`;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [payload.email],
  };

  const queryResult: QueryResult<iUserResultWithoutPassword> =
    await client.query(queryConfig);

  return queryResult.rows[0];
};


