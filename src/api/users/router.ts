import { Router } from "express";

import { createUser, getUserByEmail, getUserById } from "./controllers";

const usersRouter = Router();

usersRouter.post("/", createUser);
usersRouter.get("/", getUserByEmail);
usersRouter.get("/:id", getUserById);

export default usersRouter;
