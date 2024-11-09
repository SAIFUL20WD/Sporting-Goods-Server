"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const ordervalidationSchema = zod_1.z.object({
    user: zod_1.z.object({}),
    productId: zod_1.z.array(zod_1.z.string()),
});
exports.default = ordervalidationSchema;
