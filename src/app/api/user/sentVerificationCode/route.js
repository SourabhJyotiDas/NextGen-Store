import User from "@/models/User";
import { dbConnect } from "@/utils/database";

export async function POST(req) {
   await dbConnect();

   try {
      const { email } = await req.json();

      if (!email) {
         return Response.json(
            {
               success: false,
               message: "Email shouldn't be empty"
            },
            { status: 400 }
         );
      }

      let user = await User.findOne({ email });

      // Generate a random 6-digit verification code
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

       user.verificationCode = verificationCode;

      // Create new user with verification code
      await user.save()

      return Response.json(
         {
            success: true,
            verificationCode // (Optional: Send this only for debugging; remove in production)
         },
         { status: 200 }
      );
   } catch (error) {
      return Response.json(
         {
            success: false,
            message: error.message,
         },
         { status: 500 }
      );
   }
};
