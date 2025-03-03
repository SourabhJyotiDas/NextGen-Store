import mongoose from "mongoose";

const ShipmentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  trackingNumber: String,
  carrier: String,
  estimatedDelivery: Date,
  status: { type: String, enum: ["pending", "shipped", "delivered"], default: "pending" },
},{ timestamps: true });


const Shipment = mongoose.models.Shipment || mongoose.model("Shipment", ShipmentSchema);

export default Shipment;
