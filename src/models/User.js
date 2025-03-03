import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
   name: String,
   email: { type: String, unique: true, required: true },
   passwordHash: String,
   phone: String,
   address: [String],
   role: { type: String, enum: ["customer", "admin", "seller"], default: "customer" },
   wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
   cart: [{ productId: mongoose.Schema.Types.ObjectId, quantity: Number }],
},{ timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User;
