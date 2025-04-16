import { dbConnect } from "@/utils/database";
import Product from "@/models/Product";

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();

    const newProduct = await Product.create(body);

    return Response.json({ success: true, product: newProduct });
  } catch (err) {
    console.error("POST /api/product error:", err);
    return Response.json({ success: false, message: err.message }, { status: 500 });
  }
}
