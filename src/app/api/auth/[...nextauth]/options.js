import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import { dbConnect } from "@/utils/database";
import bcrypt from "bcryptjs";


export const authOptions = {
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),

      CredentialsProvider({
         name: "Credentials",
         credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" },
         },

         async authorize(credentials) {
            await dbConnect();
            try {
               let user = await User.findOne({ email: credentials.email });

               if (!user) {
                  throw new Error("No User found with this email");
               }

               const isMatchPassword = await bcrypt.compare(credentials.password, user.password);

               if (!isMatchPassword) {
                  throw new Error("Incorrect Password");
               }

               user = {
                  ...user.toObject(), // Convert the user document to a plain object
               };

               return user;

            } catch (error) {
               return null;
            }
         }
      }),
   ],

   secret: process.env.NEXTAUTH_SECRET,

   callbacks: {
      async session({ session, token }) {
         if (session.user) {
            await dbConnect();
            let user = await User.findOne({ email: session.user?.email });
            session.data = user
         }
         return session;
      },
      async jwt({ token, user }) {
         if (user) {
            token.data = user;
         }
         return token;
      },
   },

   session: {
      strategy: "jwt", // Use JWT for session storage
   },

   pages: {
      signIn: "/user/signin", // Custom sign-in page (optional)
   },

   debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);
