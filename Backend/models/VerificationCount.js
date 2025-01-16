import mongoose from "mongoose";
const { Schema } = mongoose;

const VerificationCountSchema = new Schema({
  user: { type: Number, default: 0 },
}, { timestamps: true });

const verifycount = mongoose.model("VerificationCount", VerificationCountSchema);
export default verifycount;
