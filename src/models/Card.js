import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  cardNumber: {
    type: String,
    required: true,
  },

  cardHolderName: {
    type: String,
    required: true,
  },

  expiryMonth: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
  },

  expiryYear: {
    type: Number,
    required: true,
  },

  cvv: {
    type: String,
    required: true,
  },

  cardType: {
    type: String,
    enum: ["debit", "credit"],
    required: true,
  },

  last4Digits: {
    type: String,
    required: true,
  },

  brand: {
    type: String,
    enum: ["Visa", "MasterCard", "Amex", "Discover", "Rupay", "Other"],
    default: "Other",
  },

  isDefault: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const Card = mongoose.models.Card || mongoose.model("Card", CardSchema);

export default Card;
