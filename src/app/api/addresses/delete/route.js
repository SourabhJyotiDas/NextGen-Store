import { dbConnect } from "@/utils/database";
import Address from "@/models/Address";

export async function DELETE(req, { params }) {
  await dbConnect();

  try {
    const addressId = params.id;

    const deleted = await Address.findByIdAndDelete(addressId);

    if (!deleted) {
      return Response.json({ success: false, message: "Address not found" }, { status: 404 });
    }

    return Response.json({ success: true, message: "Address deleted successfully" });
  } catch (err) {
    console.error("DELETE /api/address/[id] error:", err);
    return Response.json({ success: false, message: err.message }, { status: 500 });
  }
}
