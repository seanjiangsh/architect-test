import dynamoose from "dynamoose";

import { Item } from "dynamoose/dist/Item";

import db, { tablePrefix } from "../server";

export type Note = {
  id: string;
  userId: string;
  title: string;
  body: string;
  createdAt?: string;
  updatedAt?: string;
};

const noteSchema = new db.Schema(
  {
    id: { type: String, hashKey: true },
    userId: {
      type: String,
      index: { name: "userIdIndex", type: "global", project: true },
      required: true,
    },
    title: String,
    body: String,
  },
  { timestamps: true }
);

// Create a model
export const NoteModel = db.model<Item & Note>(
  `${tablePrefix}-note`,
  noteSchema,
  { throughput: "ON_DEMAND" }
);

export const createNote = async (
  args: Pick<Note, "userId" | "title" | "body">
) => {
  const id = Math.random().toString(36).substring(7);
  const data = { id, ...args };
  // * 1st way
  // const noteModel = new NoteModel({ id, ...args });
  // await noteModel.save();
  // return noteModel.toJSON();
  // * 2nd way
  // const noteModel = await NoteModel.create({ id, ...args });
  // return noteModel.toJSON();
  // * transaction
  const noteTransaction = NoteModel.transaction.create(data);
  await dynamoose.transaction([noteTransaction]);
  return await getNoteById(id);
};

export const updateNote = async (
  id: string,
  data: { title?: string; body?: string }
) => {
  const note = await getNoteById(id);
  if (!note) return;
  const title = data.title || "Untitled Note";
  const body = data.body || "";
  // * update
  const result = await NoteModel.update({ id, title, body });
  return result.toJSON() as Note;
  // * transaction
  // const transData = { $SET: data };
  // const noteTransaction = NoteModel.transaction.update({ id }, transData);
  // await dynamoose.transaction([noteTransaction]);
  // return await getNoteById(id);
};

export const getUserNotes = async (userId: string) => {
  return await NoteModel.query("userId").eq(userId).exec();
};

export const getNoteById = async (id: string) => {
  // * this is how to query with exists (like IS NOT NULL in SQL)
  // const testdata = await NoteModel.query("id")
  //   .eq(id)
  //   .where("body")
  //   .exists()
  //   .exec();
  // console.log({ testdata });
  const data = await NoteModel.get({ id });
  return data?.toJSON() as Note | undefined;
};

export const deleteNote = async (id: string) => {
  const note = await getNoteById(id);
  if (!note) return;
  await NoteModel.delete({ id });
  return note;
};
