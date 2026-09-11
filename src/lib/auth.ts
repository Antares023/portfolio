import GithubProvider from "next-auth/providers/github";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }: any) {
      if (profile?.login === "Antares023") {
        return true;
      }
      return false; 
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.username = token.username as string;
      }
      return session;
    },
    async jwt({ token, profile }: any) {
      if (profile) {
        token.username = profile.login;
      }
      return token;
    },
  }
};
