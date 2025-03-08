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
        const user = await db.collection("users").findOne({ username });

        if (!user) {
          throw new Error("No user found with that username");
        }

        const isValid = await compare(password, user.password);
        if (!isValid) {
          throw new Error("Invalid password");
        }

        return { username: user.username }; // Can also include other data like `id`
      },
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.username = user.username;
      }
      return token;
    },
    async session(session, token) {
      session.user.username = token.username;
      return session;
    },
  },
  pages: {
    signIn: "/Login", // Customize the sign-in page
  },
});
