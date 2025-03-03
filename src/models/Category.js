import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: String,
  description: String,
  parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null },
},{ timestamps: true });


const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);
export default Category;
