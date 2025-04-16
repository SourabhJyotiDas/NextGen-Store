import { dbConnect } from "@/utils/database";
import Card from "@/models/Card";

export async function PUT(req, { params }) {
  await dbConnect();

  try {
    const body = await req.json();
    const cardId = params.id;

    const updated = await Card.findByIdAndUpdate(cardId, body, { new: true });

    if (!updated) {
      return Response.json({ success: false, message: "Card not found" }, { status: 404 });
    }

    return Response.json({ success: true, card: updated });
  } catch (err) {
    console.error("PUT /api/card/[id] error:", err);
    return Response.json({ success: false, message: err.message }, { status: 500 });
  }
}
