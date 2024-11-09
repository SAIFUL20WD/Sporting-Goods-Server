import { Schema, model } from "mongoose";
import { TPayment } from "./payment.interface";

const paymentSchema = new Schema<TPayment>(
    {
        user: { type: Object, required: true },
        orderId: { type: Schema.Types.ObjectId, required: true },
        transcationId: { type: String, required: true },
        status: { type: String, enum: ["success", "pending", "failed"] },
    },
    { timestamps: true, versionKey: false },
);

const Payment = model<TPayment>("payment", paymentSchema);

export default Payment;
