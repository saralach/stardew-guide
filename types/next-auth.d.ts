import NextAuth from "next-auth";
import { Session } from "next-auth";

// Extend NextAuth's built-in types
declare module "next-auth" {
  interface Session {
    // Add username to user & preserve existing user properties
    user: {
      username: string;
    } & DefaultSession["user"]

  }

  interface User {
    username: string;
    token?: string;
  }
}