import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
   name: { type: String, required: true }, // Recipient's name
   phone: { type: String, required: true }, // Contact number
   pincode: { type: String, required: true }, // ZIP/Postal Code
   state: { type: String, required: true }, // State
   city: { type: String, required: true }, // City
   houseNo: { type: String, required: true }, // House No./Building
   roadName: { type: String, required: true }, // Street/Road name
   landmark: { type: String }, // Nearby Landmark (optional)
   type: { type: String, enum: ["Home", "Work"], required: true }, // Address Type
}, { timestamps: true });

const Address = mongoose.models.Address || mongoose.model("Address", AddressSchema);

export default Address;
