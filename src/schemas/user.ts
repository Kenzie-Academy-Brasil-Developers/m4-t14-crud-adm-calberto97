import { number, z } from "zod";

export const userSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().max(20),
  email: z.string().email().max(100),
  password: z.string().max(120),
  admin: z.boolean(),
  active: z.boolean(),
});

export const userCreationRequestSchema = userSchema
  .omit({
    id: true,
    active: true,
  })
  .partial({ admin: true });

export const userCreationResultSchema = userSchema.omit({
  password: true,
});

export const userUpdateRequestSchema = userSchema
  .omit({
    id: true,
    active: true,
    admin: true,
  })
  .partial();

export const userLoginSchema = userSchema.pick({
  email: true,
  password: true,
});
