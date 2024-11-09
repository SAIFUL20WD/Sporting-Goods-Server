import { z } from "zod";

const ordervalidationSchema = z.object({
    user: z.object({}),
    productId: z.array(z.string()),
});

export default ordervalidationSchema;
