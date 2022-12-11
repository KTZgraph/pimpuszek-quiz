/*
https://www.youtube.com/watch?v=k_x6kGHhEns
https://www.youtube.com/watch?v=EL8eXM1sGaU

// NextJS Project Tutorial - User Authentication using JWT - 12
https://www.youtube.com/watch?v=S1D9IQM8bFA&list=PLB_Wd4-5SGAbcvGsLzncFCrh-Dyt7wr5F&index=12
*/

// https://github.com/nextauthjs/next-auth/issues/243
import jwt from "next-auth/jwt";

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
        // setCookie({ res }, "name", "value", {
        //   maxAge: 2 * 24 * 60 * 60,
        //   path: "/",
        //   // httpOnly: true,
        //   httpOnly: false,
        // });

        const { email, password: inputPassword } = credentials;
        const user = await UserModel.findOne({ email });
        if (!user) {
          throw new Error("Jeszce nie zarejestrwany user");
        }

        if (user) {
          // https://github.com/nextauthjs/next-auth/discussions/4428
          return signInUser({ user, inputPassword });
        }
      },
    }),
  ],
  session: {
    // https://stackoverflow.com/questions/73933990/next-auth-session-token-invalid-signature-on-jwt-io
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async session({ session, token, user }) {
      session.user.id = token.id;
      session.accessToken = token.AccessToken;
      session.jti = token.jti;

      session.jwt = `Tu ma być ${resultJWT}`;
      console.log("session token: ", session.accessToken);

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
        user.myToken = token;
      }
      if (account) {
        token.access_token = account.access_token;
      }

      // https://github.com/nextauthjs/next-auth/issues/243
      console.log("TOKEN", token, user);
      return token;
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
