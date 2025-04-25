/**
 * MODULE:  pages/api/auth/[...nextauth].ts
 * 
 * SUMMARY:
 *   Configuration for NextAuth; used for account functionality.
 * 
 * DEPENDENCIES:
 *   - bcryptjs: for testing passwords against a password hash
 *   - next-auth: for retrieving session data
 *   - next-auth/jwt: for generating web tokens
 *   - next-auth/providers/credentials: for next-auth configuration of credentials
 *   - lib/mongodb: for connecting to the database
 */

import { compare } from "bcryptjs";
import NextAuth, { AuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/lib/mongodb";


export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider ({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        const { username, password } = credentials as { username: string; password: string };

        // Get user info from database
        const { db } = await connectToDatabase();
        const userData = await db.collection("users").findOne({ username });

        if (!userData)
          throw new Error("No user found with that username");

        // Confirm password is correct
        const isValidPassword = await compare(password, userData.password);
        if (!isValidPassword)
          throw new Error("Invalid password");

        const user: User = { 
          id: userData.username,
          username: userData.username, 
          token: userData.token 
        };
        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }): Promise<JWT> {
      if (user)
        token.username = user.username;
      return token;
    },
    // Sessions used for easier accessing data on client side;
    // not using traditional server-side session storage.
    async session({ session, token }: { session: Session; token: JWT }): Promise<Session> { 
      if(token)
        session.user.username = token.username;
      return session;
    },
  },
  pages: {
    signIn: "/Login", // Use my custom sign-in page
  },
};

export default NextAuth(authOptions);