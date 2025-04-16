import { dbConnect } from "@/utils/database";
import Address from "@/models/Address";

export async function PUT(req, { params }) {
  await dbConnect();

  try {
    const body = await req.json();
    const addressId = params.id;

    const updatedAddress = await Address.findByIdAndUpdate(addressId, body, { new: true });

    if (!updatedAddress) {
      return Response.json({ success: false, message: "Address not found" }, { status: 404 });
    }

    return Response.json({ success: true, address: updatedAddress });
  } catch (err) {
    console.error("PUT /api/address/[id] error:", err);
    return Response.json({ success: false, message: err.message }, { status: 500 });
  }
}
