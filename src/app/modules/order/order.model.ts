import { Schema, model } from "mongoose";
import { TOrder } from "./order.interface";

const orderSchema = new Schema<TOrder>(
    {
        user: { type: Object, required: true },
        products: { type: [Object], required: true },
        totalPrice: { type: Number, required: true },
    },
    { timestamps: true, versionKey: false },
);

const OrderModel = model("order", orderSchema);

export default OrderModel;
