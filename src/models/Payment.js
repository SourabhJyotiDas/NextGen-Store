import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  amount: Number,
  method: { type: String, enum: ["credit_card", "paypal", "cash_on_delivery"] },
  status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
  transactionId: String,
},{ timestamps: true });


const Payment = mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);

export default Payment;
