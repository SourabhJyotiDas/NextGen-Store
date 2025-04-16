import { dbConnect } from "@/utils/database";
import Product from "@/models/Product";


export async function GET() {
  await dbConnect();
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return Response.json({ success: true, products });
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
