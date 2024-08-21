import { z } from "zod";

const userValidationSchema = z.object({
    name: z.string().min(5).max(50),
    email: z.string().email(),
    password: z
        .string({
            invalid_type_error: "Password must be string",
        })
        .max(20, { message: "Password can not be more than 20 characters" }),
});

export default userValidationSchema;
