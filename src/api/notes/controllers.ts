import createError from "http-errors";
import { NextFunction, Request, Response } from "express";
import * as notesServer from "../../ddb/models/notes.server";
import * as usersServer from "../../ddb/models/users.server";

export const createNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.body;
  if (!userId) return next(createError(400, "Bad Request"));
  const title = req.body.title || "Untitled Note";
  const body = req.body.body || "";
  const newNote = await notesServer.createNote({ userId, title, body });
  return res.status(201).send(newNote);
};

export const updateNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params as { id: string };
  const { body } = req;
  if (!id) return next(createError(400, "Bad Request"));
  const updatedNote = await notesServer.updateNote(id, body);
  if (!updatedNote) return next(createError(404, "Not Found"));
  return res.send(updatedNote);
};

export const getUserNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.query as { userId: string };
  if (!userId) return next(createError(400, "Bad Request"));
  const user = await usersServer.getUserById(userId);
  if (!user) return next(createError(400, "Bad Request"));
  const notes = await notesServer.getUserNotes(userId);
  return res.send(notes);
};

export const getNoteById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params as { id: string };
  if (!id) return next(createError(400, "Bad Request"));
  const note = await notesServer.getNoteById(id);
  if (!note) return next(createError(404, "Not Found"));
  return res.send(note);
};

export const deleteNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params as { id: string };
  if (!id) return next(createError(400, "Bad Request"));
  const note = await notesServer.deleteNote(id);
  if (!note) return next(createError(404, "Not Found"));
  return res.send(note);
};
