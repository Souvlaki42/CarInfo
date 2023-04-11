import { InferSchemaType, model, Schema } from "mongoose";

const otpSchema = new Schema({
    email: { type: String, required: true, unique: true },
    otp: { type: String, required: true, unique: true },
});

type OTP = InferSchemaType<typeof otpSchema>;

export default model<OTP>("OTP", otpSchema);