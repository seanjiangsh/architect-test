import { Item } from "dynamoose/dist/Item";

import db, { tablePrefix } from "../server";

export type User = {
  id: string;
  email: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
};

const userSchema = new db.Schema(
  {
    id: { type: String, hashKey: true },
    email: {
      type: String,
      index: { name: "emailIndex", type: "global", project: true },
    },
    password: String,
  },
  { timestamps: true }
);

// Create a model
export const UserModel = db.model<Item & User>(
  `${tablePrefix}-user`,
  userSchema,
  { throughput: "ON_DEMAND" }
);

export const createUser = async (
  args: Pick<User, "id" | "email" | "password">
) => {
  const { id, email, password } = args;
  // const userModel = new UserModel({ id, email, password });
  // await userModel.save();
  const userModel = await UserModel.create({ id, email, password });
  return userModel.toJSON() as User;
};

export const getUserById = async (id: string) => {
  const data = await UserModel.get(id);
  return data?.toJSON() as User | undefined;
};

export const getUserByEmail = async (email: string) => {
  const data = await UserModel.query("email").eq(email).exec();
  const user = data[0];
  return user as User | undefined;
};
