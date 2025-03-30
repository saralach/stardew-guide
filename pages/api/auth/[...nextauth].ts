import NextAuth, { AuthOptions, Awaitable, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { connectToDatabase } from "@/lib/mongodb";
import { compare } from "bcryptjs";
import { Session } from "next-auth";

/*interface Credentials {
  username: string;
  password: string;
}*/

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider ({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        const { username, password } = credentials as { username: string; password: string };;

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
    signIn: "/Login", // Customize the sign-in page
  },
};

export default NextAuth(authOptions);




/*export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider ({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials as Credentials;

        // ----- Get user info from database -----------------
        const { db } = await connectToDatabase();
        const user = await db.collection("users").findOne({ username });

        if (!user)
          throw new Error("No user found with that username");

        // ----- Confirm password is correct -----------------
        const isValidPassword = await compare(password, user.password);
        if (!isValidPassword)
          throw new Error("Invalid password");

        return {
          username: username,
          token: user.token
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    encryption: true
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
    signIn: "/Login", // Customize the sign-in page
  },
};

export default NextAuth(authOptions);*/






/*export const authOptions = {
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
  secret: process.env.NEXTAUTH_SECRET,
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
};

export default NextAuth(authOptions);
*/
