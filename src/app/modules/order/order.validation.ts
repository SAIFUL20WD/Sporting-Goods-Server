import { z } from "zod";

const ordervalidationSchema = z.object({
    email: z.string().email(),
    productId: z.string(),
    price: z.number().positive(),
    quantity: z.number().positive(),
});

export default ordervalidationSchema;
