import { User, UserModel } from "./models/users.server";
import { Note, NoteModel } from "./models/notes.server";
import { ModelType } from "dynamoose/dist/General";
import { Item } from "dynamoose/dist/Item";

const users: Array<User> = [
  {
    id: "1",
    email: "test@test.com",
    password: "password",
  },
];

const notes: Array<Note> = [
  {
    id: "1",
    userId: "1",
    title: "Note 1",
    body: "This is note 1",
  },
  {
    id: "2",
    userId: "1",
    title: "Note 2",
    body: "This is note 2",
  },
];

const deleteData = async (model: ModelType<Item & { id: string }>) => {
  const data = await model.scan().all().exec();
  if (!data.length) return;
  const ids = data.map(({ id }) => id);
  await model.batchDelete(ids);
};

const seedData = async () => {
  // * users
  await deleteData(UserModel);
  await UserModel.batchPut(users);
  // * notes
  await deleteData(NoteModel);
  await NoteModel.batchPut(notes);

  console.log("Data seeded successfully");
};

seedData();
