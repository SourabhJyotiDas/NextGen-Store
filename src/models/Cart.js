import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
   items: [{ productId: mongoose.Schema.Types.ObjectId, quantity: Number }],
},{ timestamps: true })



const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);

export default Cart;
