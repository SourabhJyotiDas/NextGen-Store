import { dbConnect } from "@/utils/database";
import Card from "@/models/Card";

export async function GET(req) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return Response.json(
        { success: false, message: "Missing userId" },
        { status: 400 }
      );
    }

    const cards = await Card.find({ user: userId }).sort({ createdAt: -1 });

    return Response.json({ success: true, cards });
  } catch (err) {
    console.error("GET /api/card error:", err);
    return Response.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
