import { Types } from "mongoose";

export type TPayment = {
    user: object;
    orderId: Types.ObjectId;
    transcationId: string;
    status: "success" | "pending" | "failed";
};
