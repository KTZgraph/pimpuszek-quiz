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
        console.log("------------- authorize ------------------");
        const { email, password: inputPassword } = credentials;
        const user = await UserModel.findOne({ email });
        if (!user) {
          throw new Error("Jeszce nie zarejestrwany user");
        }
        if (user) {
          // signInUser zwraca usera
          return signInUser({ user, inputPassword });
        }
      },
    }),
  ],
  // https://next-auth.js.org/configuration/callbacks
  // https://youtu.be/S1D9IQM8bFA?t=1166

  callbacks: {
    // WARNING signIn i redirect NIE NADPISUJEMY
    // async signIn({ user, account, profile, email, credentials }) {
    //   return true;
    // },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl;
    // },
    async session({ session, user, token }) {
      console.log("\n\n\n\n\nSESSION", { session, user });
      // BUG - trzeba wywoąłć np w /login żeby zobaczyć
      //       const sessionUser = await getSession();
      console.log("user z session z ...nextatuth ", user);

      // // BUG nagle nic nie wyświelta
      if (user && user.id) {
        console.log(
          "\n\n\n\n\n\n\n\n\nsession ...nextauth.js user && user._id"
        );
        session.user.id = user.id;
        session.user.email = user.email;
        session.user.image = user.image;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("\n\n\n\n\nJWT", { token, user });
      if (user && user._id) {
        // https://youtu.be/S1D9IQM8bFA?t=1370
        token.id = user._id;
      }
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
