import { NextResponse } from "next/server";
import multer from "multer";
import { dbConnect } from "@/utils/database";
import cloudinary from "@/utils/cloudinary";
import User from "@/models/User";
import { promisify } from "util";
import fs from "fs";

// Configure Multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Convert Multer’s callback-based function to a Promise
const runMiddleware = promisify(upload.single("file"));

export const config = {
   api: {
      bodyParser: false, // Disable default body parser for file uploads
   },
};

export async function POST(req, res) {
   await dbConnect();

   try {
      await runMiddleware(req, res); // Run Multer middleware

      if (!req.file) {
         return Response.json(
            {
              success: true,
              message: `File not found`
            },
            { status: 200 }
          );
      }

      const { email } = req.body; // Email should be part of the form data

      let user = await User.findOne({ email });

      if (!user) {
         return Response.status(400).json({ success: false, message: "User not found" });
      }

      // Convert file buffer to Base64
      const base64File = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

      // Upload to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(base64File, {
         folder: "next-app",
      });

      console.log(uploadResponse);

      return Response.json(
         {
           success: true,
           message: `Upload successfully`
         },
         { status: 200 }
       );
   } catch (error) {
      return Response.json(
         {
           success: false,
           message: error.message
         },
         { status: 500 }
       );
   }
}
