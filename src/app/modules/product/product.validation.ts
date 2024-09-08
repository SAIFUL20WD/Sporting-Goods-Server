import { z } from "zod";

const variantValidationSchema = z.array(
    z.object({
        type: z.string().trim(),
        value: z.string().trim(),
    }),
);

const inventoryValidationSchema = z.object({
    quantity: z.number().positive().finite(),
    inStock: z.boolean(),
});

const productValidationSchema = z.object({
    name: z.string().trim(),
    // .min(5, { message: "Product name must be more than 5 character" })
    // .max(50, { message: "Product name must be less than 50 character" }),
    description: z.string().trim(),
    image: z.array(z.string()),
    price: z.number().positive().finite(),
    brand: z.string().trim(),
    category: z.string().trim(),
    rating: z.number().max(5),
    tag: z.string().optional(),
    variants: variantValidationSchema.optional(),
    inventory: inventoryValidationSchema,
});

export const productUpdateValidationSchema = z.object({
    name: z.string().trim().optional(),
    description: z.string().trim().optional(),
    image: z.array(z.string()).optional(),
    price: z.number().positive().finite().optional(),
    brand: z.string().trim().optional(),
    category: z.string().trim().optional(),
    rating: z.number().max(5).optional(),
    tag: z.string().optional(),
    variants: z
        .array(
            z
                .object({
                    type: z.string().optional(),
                    value: z.string().optional(),
                })
                .optional(),
        )
        .optional(),
    inventory: z
        .object({
            quantity: z.number().optional(),
            inStock: z.boolean().optional(),
        })
        .optional(),
});

export default productValidationSchema;
