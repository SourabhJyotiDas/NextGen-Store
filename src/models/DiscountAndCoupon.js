import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema({
  code: { type: String, unique: true },
  discountPercentage: Number,
  expiryDate: Date,
  usageLimit: Number,
},{ timestamps: true });


const Coupon = mongoose.models.Coupon || mongoose.model("Coupon", CouponSchema);

export default Coupon;
