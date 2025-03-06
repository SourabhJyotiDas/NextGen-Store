
import User from "@/models/User";
import { dbConnect } from "@/utils/database";
import bcrypt from "bcryptjs";


export async function POST(req) {
   await dbConnect();

   try {
      const { name, email, password } = await req.json();

      if (!name || !email || !password) {
         return Response.json(
            {
               success: false,
               message: "Fields should not empty"
            },
            { status: 500 }
         );
      }


      let user = await User.findOne({ email });

      if (user) {
         return Response.json(
            {
               success: true,
               message: `Email already in use !`
            },
            { status: 500 }
         );
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      user = await User.create({ name, email, password: hashedPassword })

      return Response.json(
         {
            success: true,
            message: "User registered successfully"
         },
         { status: 201 }
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