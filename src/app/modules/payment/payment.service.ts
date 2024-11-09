import { verifyPayment } from "./payment.utils";
import { readFileSync } from "fs";
import { join } from "path";
import dotenv from "dotenv";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import Payment from "./payment.modal";

dotenv.config();

const confirmationServiceForCreateOrder = async (transactionId: string, status: string) => {
    const verifyResponse = await verifyPayment(transactionId);

    let message = "";
    const link = process.env.CLIENT_URL;

    if (verifyResponse && verifyResponse.pay_status === "Successful") {
        const payment = await Payment.findOneAndUpdate({ transcationId: transactionId }, { status: "success" });
        if (!payment) {
            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to payment");
        }

        message = "Your Payment is Successful!";
    } else {
        message = "Payment Failed!";
    }

    const filePath = join(__dirname, "../../../../public/confirmation.html");
    let template = readFileSync(filePath, "utf-8");

    template = template.replace("{{message}}", message);
    template = template.replace("{{link}}", `${link}`);

    return template;
};

const getAllPayments = async () => {
    const payments = await Payment.find({});
    return payments;
};

export const paymentServices = {
    confirmationServiceForCreateOrder,
    getAllPayments,
};
