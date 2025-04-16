import { dbConnect } from "@/utils/database";
import Card from "@/models/Card";

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();

    const {
      user,
      cardNumber,
      cardHolderName,
      expiryMonth,
      expiryYear,
      cvv,
      cardType,
      brand,
      isDefault,
    } = body;

    const last4Digits = cardNumber.slice(-4);

    const newCard = await Card.create({
      user,
      cardNumber,
      cardHolderName,
      expiryMonth,
      expiryYear,
      cvv,
      cardType,
      brand,
      isDefault,
      last4Digits,
    });

    return Response.json({ success: true, card: newCard });
  } catch (err) {
    console.error("POST /api/card error:", err);
    return Response.json({ success: false, message: err.message }, { status: 500 });
  }
}
