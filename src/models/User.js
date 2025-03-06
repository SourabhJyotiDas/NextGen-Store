import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
   name: String,
   email: { type: String, unique: true, required: true },
   password: String,
   phone: String,
   avatar: {
      public_id: String,
      url: String,
   },
   address: [String],
   role: { type: String, enum: ["customer", "admin", "seller"], default: "customer" },
   verify: Boolean
}, { timestamps: true });


const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
