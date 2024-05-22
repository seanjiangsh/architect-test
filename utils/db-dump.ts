import { ModelType } from "dynamoose/dist/General";
import { Item } from "dynamoose/dist/Item";

import { UserModel } from "../src/ddb/models/users.server";
import { NoteModel } from "../src/ddb/models/notes.server";

const dbDump = async () => {
  const models = [UserModel, NoteModel];
  for (const model of models) await tableDump(model);
};

const tableDump = async (model: ModelType<Item>) => {
  const data = await model.scan().all().exec();
  console.log(model.table().name);
  console.table(data.toJSON());
};

dbDump();
