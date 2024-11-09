"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    user: { type: Object, required: true },
    products: { type: [Object], required: true },
    totalPrice: { type: Number, required: true },
}, { timestamps: true, versionKey: false });
const OrderModel = (0, mongoose_1.model)("order", orderSchema);
exports.default = OrderModel;
