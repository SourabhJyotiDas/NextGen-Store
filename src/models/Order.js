import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [{ productId: mongoose.Schema.Types.ObjectId, quantity: Number, price: Number }],
  totalAmount: Number,
  status: { type: String, enum: ["pending", "shipped", "delivered", "cancelled"], default: "pending" },
  paymentStatus: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
  address: String,

},{ timestamps: true });

const Order = mongoose.model("Order", OrderSchema);
export default Order;
