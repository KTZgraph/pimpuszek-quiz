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

export const registerUser = async (email, inputPassword) => {
  const user = await UserModel.findOne({ email: email });
  if (user) {
    throw new Error("User jest już zarejestrowany");
  }
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(inputPassword, salt);
  const newUserData = { email: email, password: encryptedPassword };

  await UserModel.create(newUserData, function (err, newUserData) {
    if (err) return err;
  });
};
