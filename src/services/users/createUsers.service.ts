import {
  iUserRequest,
  iUserResultWithoutPassword,
} from "../../interfaces/users.interfaces";
import { client } from "../../database";
import format from "pg-format";
import { QueryResult } from "pg";
import { userCreationResultSchema } from "../../schemas/user";
import { hash } from "bcryptjs";

export const createUsersService = async (
  payload: iUserRequest
): Promise<iUserResultWithoutPassword> => { 
  const hashedPassword = await hash(payload.password, 10)
  payload.password = hashedPassword


  const queryString: string = format(
    `
      INSERT INTO
          users(%I)
      VALUES(%L)
      RETURNING id, name, email, admin, active;
      `,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: QueryResult<iUserResultWithoutPassword> =
    await client.query(queryString);

  return userCreationResultSchema.parse(queryResult.rows[0]);
};


