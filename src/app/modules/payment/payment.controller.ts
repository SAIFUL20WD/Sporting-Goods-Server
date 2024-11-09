import { Request, Response } from "express";
import { paymentServices } from "./payment.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const confirmationControllerForCreateOrder = async (req: Request, res: Response) => {
    const { transactionId, status } = req.query;

    const result = await paymentServices.confirmationServiceForCreateOrder(transactionId as string, status as string);
    res.send(result);
};

const getAllPayments = catchAsync(async (req, res) => {
    const result = await paymentServices.getAllPayments();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All Payment retrived successfully",
        data: result,
    });
});

export const paymentController = {
    confirmationControllerForCreateOrder,
    getAllPayments,
};
