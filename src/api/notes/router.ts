import { Router } from "express";

import {
  createNote,
  getUserNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from "./controllers";

const notesRouter = Router();

notesRouter.post("/", createNote);
notesRouter.post("/:id", updateNote);
notesRouter.get("/", getUserNotes);
notesRouter.get("/:id", getNoteById);
notesRouter.delete("/:id", deleteNote);

export default notesRouter;
