import arc, { HttpAsyncHandler } from "@architect/functions";

import { getNoteById } from "../../utils/ddb/models/notes.server.js";

const handler: HttpAsyncHandler = async (req) => {
  try {
    const { id, userId } = req.queryStringParameters || {};
    if (!id || !userId) {
      const body = { error: "Bad Request" };
      return { status: 400, body: JSON.stringify(body) };
    }
    const note = await getNoteById({ id, userId });
    console.log({ id, userId, note });
    if (!note)
      return { status: 404, body: JSON.stringify({ error: "Not Found" }) };
    return { status: 200, body: JSON.stringify(note) };
  } catch (err) {
    console.log({ err });
    const body = { error: "Internal Server Error" };
    return { status: 500, body: JSON.stringify(body) };
  }
};

exports.handler = arc.http(handler);
