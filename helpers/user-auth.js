import bcrypt from "bcrypt";

import { connectMongodb } from "../services/mongodb/mongodb-connector";
connectMongodb();

const UserModel = require("../services/mongodb/mongodb-schema-user");

export const userLogin = async (email, inputPassword) => {
  const user = await UserModel.findOne({ email });

  if (!user.password) {
    throw new Error("Prosze podaj hasło");
  }

  const isMatch = await bcrypt.compare(inputPassword, user.password);
  if (!isMatch) {
    throw new Error("Niepoprawny login lub hasło");
  }

  return user;
};
