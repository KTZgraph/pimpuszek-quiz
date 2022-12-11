/*
https://www.youtube.com/watch?v=k_x6kGHhEns
https://www.youtube.com/watch?v=EL8eXM1sGaU

// NextJS Project Tutorial - User Authentication using JWT - 12
https://www.youtube.com/watch?v=S1D9IQM8bFA&list=PLB_Wd4-5SGAbcvGsLzncFCrh-Dyt7wr5F&index=12
*/

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import { connectMongodb } from "../../../services/mongodb/mongodb-connector";

connectMongodb().catch((error) => console.error(error));

// const NotionQuizzModel = require("../../../services/mongodb/mongodb-schema");
const UserModel = require("../../../services/mongodb/mongodb-schema-user");

export const authOptions = {
  secret: process.env.NEXT_PUBLIC_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password: inputPassword } = credentials;
        const user = await UserModel.findOne({ email });
        if (!user) {
          throw new Error("Jeszce nie zarejestrwany user");
        }
        if (user) {
          return signInUser({ user, inputPassword });
        }
      },
    }),
  ],

  callbacks: {
    // https://github.com/nextauthjs/next-auth/issues/608
    async session({ session, user, token }) {
      console.log("here2");
      console.log(token);
      console.log(session);
      if (!session?.user || !token?.account) {
        return session;
      }

      session.user.id = token.account.id;
      session.accessToken = token.account.accessToken;

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // if (user) {
      //   // https://youtu.be/S1D9IQM8bFA?t=1370
      //   token.id = user._id || user.id;
      // }
      console.log("here");
      console.log(token);
      console.log(user);
      const isSignIn = user ? true : false;
      // Add auth_time to token on signin in
      if (isSignIn) {
        token.auth_time = Math.floor(Date.now() / 1000);
      }
      return Promise.resolve(token);
    },
  },
};

const signInUser = async ({ user, inputPassword }) => {
  if (!user.password) {
    throw new Error("Prosze podaj hasło");
  }

  const isMatch = await bcrypt.compare(inputPassword, user.password);
  if (!isMatch) {
    console.log("Niepoprawny login lub hasło");
    throw new Error("Niepoprawny login lub hasło");
  }

  if (user && isMatch) {
    // https://youtu.be/S1D9IQM8bFA?t=1290
    delete user.password;
  }

  return user;
};

export default NextAuth(authOptions);
