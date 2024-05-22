import arc, { HttpAsyncHandler } from "@architect/functions";

import { createUser } from "../../utils/ddb/models/users.server.js";

const handler: HttpAsyncHandler = async (req) => {
  try {
    const { id, email, password } = req.body || {};
    if (!id || !email || !password) {
      const body = { error: "Bad Request" };
      return { status: 400, body: JSON.stringify(body) };
    }
    const user = await createUser({ id, email, password });
    console.log({ id, email, password, user });
    return { status: 200, body: JSON.stringify(user) };
  } catch (err) {
    console.log({ err });
    const body = { error: "Internal Server Error" };
    return { status: 500, body: JSON.stringify(body) };
  }
};

exports.handler = arc.http(handler);
