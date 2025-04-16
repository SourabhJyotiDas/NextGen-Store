import { dbConnect } from "@/utils/database";
import Address from "@/models/Address";

export async function GET(req) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return Response.json({ success: false, message: "Missing userId" }, { status: 400 });
    }

    const addresses = await Address.find({ userId }).sort({ createdAt: -1 });

    return Response.json({ success: true, addresses });
  } catch (err) {
    console.error("GET /api/address error:", err);
    return Response.json({ success: false, message: err.message }, { status: 500 });
  }
}
