import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  stock: Number,
  images: [String],
  video: String,
  ratings: [{ userId: mongoose.Schema.Types.ObjectId, rating: Number, comment: String }],
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
