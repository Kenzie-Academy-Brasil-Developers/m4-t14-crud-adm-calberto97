import "express-async-errors";
import { loginRouter } from "./routers/login.routes";
import express, { Application } from "express";
import { errorHandler } from "./errors";
import { userRouter } from "./routers/users.routes";

export const app: Application = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/login", loginRouter);

app.use(errorHandler);
