export interface iUserRequest {
  name: string;
  email: string;
  password: string;
  admin: boolean;
  active: boolean;
}

export interface iUserResult extends iUserRequest {
  id: number;
}

export type iUserResultWithoutPassword = Omit<
  iUserResult,
  "password"
>;

export interface iUserEmail {
  email: string;
}

type tUpdateUser = Omit<iUserRequest, "active" | "admin">;

export type tUpdateUserRequest = Partial<tUpdateUser>;
