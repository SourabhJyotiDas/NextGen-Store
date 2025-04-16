import { dbConnect } from "@/utils/database";
import Product from "@/models/Product";

export async function DELETE(req, { params }) {
  await dbConnect();
  try {
    const deleted = await Product.findByIdAndDelete(params.id);
    if (!deleted) {
      return Response.json({ success: false, message: "Product not found" }, { status: 404 });
    }
    return Response.json({ success: true, message: "Product deleted" });
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
