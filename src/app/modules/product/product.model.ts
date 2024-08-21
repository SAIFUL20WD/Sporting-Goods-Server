import { Schema, model } from "mongoose";
import { TInventory, TProduct, TVariant } from "./product.interface";

const variantSchema = new Schema<TVariant>({
    type: { type: String, required: true },
    value: { type: String, required: true },
});

const inventorySchema = new Schema<TInventory>({
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
});

const productSchema = new Schema<TProduct>(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        image: { type: [String], required: true },
        price: { type: Number, required: true },
        brand: { type: String, required: true },
        category: { type: String, required: true },
        rating: { type: Number, required: true },
        variants: { type: [variantSchema], required: true },
        inventory: { type: inventorySchema, required: true },
    },
    { timestamps: true, versionKey: false },
);

const ProductModel = model("product", productSchema);

export default ProductModel;
