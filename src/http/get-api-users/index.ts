import arc, { HttpAsyncHandler } from "@architect/functions";

import { getUserById } from "../../utils/ddb/models/users.server.js";

const handler: HttpAsyncHandler = async (req) => {
  try {
    const { id } = req.queryStringParameters || {};
    if (!id) {
      const body = { error: "Bad Request" };
      return { status: 400, body: JSON.stringify(body) };
    }
    const user = await getUserById(id);
    return { status: 200, body: JSON.stringify(user) };
  } catch (err) {
    console.log({ err });
    const body = { error: "Internal Server Error" };
    return { status: 500, body: JSON.stringify(body) };
  }
};

exports.handler = arc.http(handler);
