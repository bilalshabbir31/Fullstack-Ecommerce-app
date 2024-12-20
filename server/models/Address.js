import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    userId: { String, required: true },
    address: { String, required: true },
    city: { String, required: true },
    pincode: { String, required: true },
    phone: { String, required: true },
    notes: { String, required: false },
  },
  {
    timestamps: true,
  }
);

const Address = mongoose.model("Address", addressSchema);

export default Address;
