import mongoose from "mongoose";


const MembershipSchema = new mongoose.Schema({
   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
   type: { type: String, enum: ["silver", "gold", "platinum"], required: true },
   benefits: [{ type: String }], // List of perks for the membership
   startDate: { type: Date, default: Date.now },
   expiryDate: { type: Date, required: true },
   isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Membership = mongoose.models.Membership || mongoose.model("Membership", MembershipSchema);
export default Membership;

