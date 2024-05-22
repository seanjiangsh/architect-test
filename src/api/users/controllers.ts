import createError from "http-errors";
import { NextFunction, Request, Response } from "express";

import * as usersServer from "../../ddb/models/users.server";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, email, password } = req.body;
  if (!id || !email || !password) return next(createError(400, "Bad Request"));
  const user = await usersServer.createUser({ id, email, password });
  return res.send(user);
};

export const getUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.query as { email: string };
  if (!email) return next(createError(400, "Bad Request"));
  const user = await usersServer.getUserByEmail(email);
  if (!user) return next(createError(400, "Bad Request"));
  return res.send(user);
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params as { id: string };
  if (!id) return next(createError(400, "Bad Request"));
  const user = await usersServer.getUserById(id);
  if (!user) return next(createError(400, "Bad Request"));
  return res.send(user);
};
