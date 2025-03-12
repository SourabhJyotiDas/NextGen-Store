import User from "@/models/User";
import { dbConnect } from "@/utils/database";

export async function POST(req) {
   await dbConnect();

   try {
      const { verificationCode, email } = await req.json();

      if (!verificationCode || !email) {
         return Response.json(
            {
               success: false,
               message: "Missing input"
            },
            { status: 400 }
         );
      }

      let user = await User.findOne({ email });

      // Generate a random 6-digit verification code
      const isMatchingCode = user.verificationCode = verificationCode;

      if (!isMatchingCode) {
         return Response.json(
            {
               success: false,
               message: "Code missmatch, try again in few minitues."
            },
            { status: 500 }
         );
      }

      // Create new user with verification code
      user.verify = true;
      await user.save()

      return Response.json(
         {
            success: true,
            message: "Verify successfully" // (Optional: Send this only for debugging; remove in production)
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
