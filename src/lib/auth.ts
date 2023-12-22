import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./db";
import User from "@/Modals/User";
import Account from "@/Modals/Account";
import { connectToDB } from "@/Utils/db";

function getGoogleCredentils() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || clientId.length === 0) {
    throw new Error("No clientId for google provider set");
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error("No clientSecret for google provider set");
  }
  return { clientId, clientSecret };
}



export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),

  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },

  providers: [
    GoogleProvider({
      clientId: getGoogleCredentils().clientId,
      clientSecret: getGoogleCredentils().clientSecret,
    }),
  ],

  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
    async jwt({ token, user }) {

      connectToDB()
      const dbuser = await User.findOne({ email: token.email });

      if (!dbuser) {
        token.id = user!.id;
        return token;
      }

      return {
        id: dbuser._id,
        name: dbuser.name,
        email: dbuser.email,
        picture: dbuser.image,
      };
    },
    redirect() {
      return "/dashboard"
    }
  },
};
