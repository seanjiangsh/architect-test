import arc, { HttpAsyncHandler } from "@architect/functions";

import { createNote } from "../../utils/ddb/models/notes.server.js";

const handler: HttpAsyncHandler = async (req) => {
  try {
    const { userId, title, body } = req.body || {};
    if (!userId || !title) {
      const body = { error: "Bad Request" };
      return { status: 400, body: JSON.stringify(body) };
    }
    const note = await createNote({ userId, title, body });
    console.log({ userId, title, body, note });
    return { status: 200, body: JSON.stringify(note) };
  } catch (err) {
    console.log({ err });
    const body = { error: "Internal Server Error" };
    return { status: 500, body: JSON.stringify(body) };
  }
};

exports.handler = arc.http(handler);
