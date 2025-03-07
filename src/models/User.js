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
   role: { type: String, enum: ["customer", "admin", "seller"], default: "customer" },
   gender: { type: String, enum: ["male", "female", "others"], default: "male" },
   verify: { type: Boolean, default: false }
}, { timestamps: true });


const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
