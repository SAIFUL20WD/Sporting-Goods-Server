"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const paymentSchema = new mongoose_1.Schema({
    user: { type: Object, required: true },
    orderId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    transcationId: { type: String, required: true },
    status: { type: String, enum: ["success", "pending", "failed"] },
}, { timestamps: true, versionKey: false });
const Payment = (0, mongoose_1.model)("payment", paymentSchema);
exports.default = Payment;
