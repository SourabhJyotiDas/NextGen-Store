
import User from "@/models/User";
import { dbConnect } from "@/utils/database";

export async function POST(req) {
  await dbConnect();

  try {
    const { name, email, imageUrl } = await req.json();

    if (!name || !email) {
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
          message: `Welcome back ${user.name}`
        },
        { status: 200 }
      );
    }

    let avatarData = {
      public_id: "GoogleId",
      url: imageUrl,
    }

    user = await User.create({ name, email, avatar: avatarData })

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