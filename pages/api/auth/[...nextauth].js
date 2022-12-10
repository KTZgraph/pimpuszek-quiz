/*
https://www.youtube.com/watch?v=k_x6kGHhEns
https://www.youtube.com/watch?v=EL8eXM1sGaU
*/

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import { connectMongodb } from "../../../services/mongodb/mongodb-connector";

connectMongodb().catch((error) => console.error(error));

// const NotionQuizzModel = require("../../../services/mongodb/mongodb-schema");
const UserModel = require("../../../services/mongodb/mongodb-schema-user");

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "myCredetials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("------------- authorize ------------------");
        const { email, password } = credentials;
        const user = await UserModel.findOne({ email });
        if (!user) {
          throw new Error("Jeszce nie zarejestrwany user");
        }
        if (user) {
          return signInUser({ user, password });
        }
      },
    }),
  ],
};

const signInUser = async ({ user, password }) => {
  if (!user.password) {
    throw new Error("Prosze podaj hasło");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Niepoprawny login lub hasło");
  }

  return user;
};

export default NextAuth(authOptions);
