import { dbConnect } from "@/utils/database";
import Address from "@/models/Address";

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const newAddress = await Address.create(body);

    return Response.json({ success: true, address: newAddress });
  } catch (err) {
    console.error("POST /api/address error:", err);
    return Response.json({ success: false, message: err.message }, { status: 500 });
  }
}
