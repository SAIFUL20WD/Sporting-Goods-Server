"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const variantSchema = new mongoose_1.Schema({
    type: { type: String, required: true },
    value: { type: String, required: true },
});
const inventorySchema = new mongoose_1.Schema({
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
});
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: [String], required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    rating: { type: Number, required: true },
    tag: { type: String, default: "New" },
    variants: { type: [variantSchema], required: true },
    inventory: { type: inventorySchema, required: true },
}, { timestamps: true, versionKey: false });
const ProductModel = (0, mongoose_1.model)("product", productSchema);
exports.default = ProductModel;
