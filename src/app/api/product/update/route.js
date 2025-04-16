import { dbConnect } from "@/utils/database";
import Product from "@/models/Product";

export async function PUT(req, { params }) {
  await dbConnect();
  try {
    const body = await req.json();
    const updatedProduct = await Product.findByIdAndUpdate(params.id, body, { new: true });
    if (!updatedProduct) {
      return Response.json({ success: false, message: "Product not found" }, { status: 404 });
    }
    return Response.json({ success: true, product: updatedProduct });
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
};