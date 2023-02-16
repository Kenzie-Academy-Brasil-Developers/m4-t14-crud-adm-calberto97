import { client } from "./../../database/config";
import { QueryConfig } from "pg";

export const deleteUserService = async (id: number): Promise<any> => {
  const queryString: string = `
    UPDATE users
    SET active = false
    WHERE id = $1;   
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  await client.query(queryConfig);

  return;
};
