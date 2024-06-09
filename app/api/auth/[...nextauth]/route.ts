import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const isProd = process.env.NODE_ENV === "production";

export const authOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: isProd ? process.env.GITHUB_ID! : process.env.GITHUB_LOCAL_ID!,
      clientSecret: isProd
        ? process.env.GITHUB_SECRET!
        : process.env.GITHUB_LOCAL_SECRET!,
    }),

    // ...add more providers here
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
