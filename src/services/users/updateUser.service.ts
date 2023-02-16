import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from "../../database";
import {
  iUserResultWithoutPassword,
  tUpdateUserRequest,
} from "./../../interfaces/users.interfaces";

export const updateUserService = async (
  payload: tUpdateUserRequest,
  id: number
): Promise<iUserResultWithoutPassword> => {
  const queryString: string = format(
    `
        UPDATE users
        SET (%I) = ROW (%L)
        WHERE id = $1
        RETURNING id,
            name,
            email,
            admin,
            active;   
    `,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<iUserResultWithoutPassword> =
    await client.query(queryConfig);

  return queryResult.rows[0];
};
