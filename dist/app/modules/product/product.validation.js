"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productUpdateValidationSchema = void 0;
const zod_1 = require("zod");
const variantValidationSchema = zod_1.z.array(zod_1.z.object({
    type: zod_1.z.string().trim(),
    value: zod_1.z.string().trim(),
}));
const inventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z.number().positive().finite(),
    inStock: zod_1.z.boolean(),
});
const productValidationSchema = zod_1.z.object({
    name: zod_1.z.string().trim(),
    // .min(5, { message: "Product name must be more than 5 character" })
    // .max(50, { message: "Product name must be less than 50 character" }),
    description: zod_1.z.string().trim(),
    image: zod_1.z.array(zod_1.z.string()),
    price: zod_1.z.number().positive().finite(),
    brand: zod_1.z.string().trim(),
    category: zod_1.z.string().trim(),
    rating: zod_1.z.number().max(5),
    tag: zod_1.z.string().optional(),
    variants: variantValidationSchema.optional(),
    inventory: inventoryValidationSchema,
});
exports.productUpdateValidationSchema = zod_1.z.object({
    name: zod_1.z.string().trim().optional(),
    description: zod_1.z.string().trim().optional(),
    image: zod_1.z.array(zod_1.z.string()).optional(),
    price: zod_1.z.number().positive().finite().optional(),
    brand: zod_1.z.string().trim().optional(),
    category: zod_1.z.string().trim().optional(),
    rating: zod_1.z.number().max(5).optional(),
    tag: zod_1.z.string().optional(),
    variants: zod_1.z
        .array(zod_1.z
        .object({
        type: zod_1.z.string().optional(),
        value: zod_1.z.string().optional(),
    })
        .optional())
        .optional(),
    inventory: zod_1.z
        .object({
        quantity: zod_1.z.number().optional(),
        inStock: zod_1.z.boolean().optional(),
    })
        .optional(),
});
exports.default = productValidationSchema;
