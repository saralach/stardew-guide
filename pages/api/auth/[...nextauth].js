import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "../../../lib/mongodb";
import { compare } from "bcryptjs";

export default NextAuth({
  providers: [
    CredentialsProvider ({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials;

        const { db } = await connectToDatabase();
        const dbResult = await db.collection("users").findOne({ username });

        if (!dbResult) {
          throw new Error("No user found with that username");
        }

        const isValid = await compare(password, dbResult.password);
        if (!isValid) {
          throw new Error("Invalid password");
        }

        return { username };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if(token) {
        session.user.username = token.username;
      }
      return session;
    },
  },
  pages: {
    signIn: "/Login", // Customize the sign-in page
  },
});
