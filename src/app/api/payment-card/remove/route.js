import { dbConnect } from "@/utils/database";
import Card from "@/models/Card";

export async function DELETE(req, { params }) {
  await dbConnect();

  try {
    const cardId = params.id;

    const deletedCard = await Card.findByIdAndDelete(cardId);

    if (!deletedCard) {
      return Response.json({ success: false, message: "Card not found" }, { status: 404 });
    }

    return Response.json({ success: true, message: "Card deleted successfully" });
  } catch (err) {
    console.error("DELETE /api/card/[id] error:", err);
    return Response.json({ success: false, message: err.message }, { status: 500 });
  }
}
