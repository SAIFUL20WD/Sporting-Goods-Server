import { z } from "zod";

const variantValidationSchema = z.array(
    z.object({
        type: z.string().trim().min(3, { message: "type must be more than 3 character" }).max(50, {
            message: "type must be less than 50 character",
        }),
        value: z.string().trim().min(3, { message: "value must be more than 3 character" }).max(50, {
            message: "value must be less than 50 character",
        }),
    }),
);

const inventoryValidationSchema = z.object({
    quantity: z.number().positive().finite(),
    inStock: z.boolean(),
});

const productValidationSchema = z.object({
    name: z
        .string()
        .trim()
        .min(5, { message: "Product name must be more than 5 character" })
        .max(50, { message: "Product name must be less than 50 character" }),
    description: z
        .string()
        .trim()
        .min(5, { message: "Description must be more than 5 character" })
        .max(200, { message: "Description must be less than 200 character" }),
    image: z.array(z.string()),
    price: z.number().positive().finite(),
    brand: z
        .string()
        .trim()
        .min(5, { message: "Product name must be more than 5 character" })
        .max(50, { message: "Product name must be less than 50 character" }),
    category: z
        .string()
        .trim()
        .min(3, { message: "Category must be more than 3 character" })
        .max(30, { message: "Category must be less than 30 character" }),
    rating: z.number().max(5),
    tag: z.string().optional(),
    variants: variantValidationSchema.optional(),
    inventory: inventoryValidationSchema,
});

export const productUpdateValidationSchema = z.object({
    name: z
        .string()
        .trim()
        .min(5, { message: "Product name must be more than 5 character" })
        .max(50, { message: "Product name must be less than 50 character" })
        .optional(),
    description: z
        .string()
        .trim()
        .min(5, { message: "Description must be more than 5 character" })
        .max(200, { message: "Description must be less than 200 character" })
        .optional(),
    image: z.array(z.string()).optional(),
    price: z.number().positive().finite().optional(),
    brand: z
        .string()
        .trim()
        .min(5, { message: "Product name must be more than 5 character" })
        .max(50, { message: "Product name must be less than 50 character" })
        .optional(),
    category: z
        .string()
        .trim()
        .min(3, { message: "Category must be more than 3 character" })
        .max(30, { message: "Category must be less than 30 character" })
        .optional(),
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
            quantity: z.number().positive().optional(),
            inStock: z.boolean().optional(),
        })
        .optional(),
});

export default productValidationSchema;
