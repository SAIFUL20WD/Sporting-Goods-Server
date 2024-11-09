import { Request, Response } from "express";
import { OrderServices } from "./order.service";
import { initiatePayment } from "../payment/payment.utils";
import Payment from "../payment/payment.modal";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import ProductModel from "../product/product.model";
// import ordervalidationSchema from "./order.validation";

const createOrder = async (req: Request, res: Response) => {
    try {
        const orderData = req.body;

        orderData.products.forEach(async (product: { productId: string; qty: number }) => {
            const databaseQuantity = await ProductModel.findById(product.productId);
            if (!databaseQuantity) {
                throw new AppError(httpStatus.BAD_REQUEST, "Product not found");
            }
            const purchaseQuantity = product.qty;
            const newDBQuantity = databaseQuantity?.inventory?.quantity - purchaseQuantity;
            const inventory = {
                quantity: newDBQuantity,
                inStock: newDBQuantity > 0 ? true : false,
            };

            const updatedProduct = await ProductModel.findOneAndUpdate(
                { _id: product.productId },
                { $set: { inventory } },
                { new: true },
            );
            if (!updatedProduct) {
                throw new AppError(httpStatus.BAD_REQUEST, "Failed to update product quantity");
            }
        });

        const result = await OrderServices.createOrderToDB(orderData);
        if (orderData.user.payment === "online") {
            const transactionId = `TXN-${Date.now()}`;

            const paymentData = {
                transactionId: transactionId,
                totalPrice: orderData?.totalPrice,
                custormerName: orderData?.user?.name,
                customerEmail: orderData?.user?.email,
                customerPhone: orderData?.user?.phone,
                customerAddress: orderData?.user?.address,
            };

            const paymentSession = await initiatePayment(paymentData);

            const newPayment = await Payment.create({
                user: orderData?.user,
                orderId: result._id,
                transcationId: transactionId,
                status: "pending",
            });
            if (!newPayment) {
                throw new AppError(httpStatus.BAD_REQUEST, "Failed to payment");
            }

            res.status(200).json({
                success: true,
                message: "Order created successfully!",
                data: paymentSession,
            });
        } else {
            res.status(200).json({
                success: true,
                message: "Order created successfully!",
                data: result,
            });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: err });
    }
};

const getAllOrders = async (req: Request, res: Response) => {
    try {
        const email = req?.query?.email;
        if (email) {
            const result = await OrderServices.getOrderByEmailFromDB(email as string);
            if (result.length === 0) {
                res.status(404).json({
                    success: false,
                    message: "Order not found!",
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: "Orders fetched successfully for user email!",
                    data: result,
                });
            }
        } else {
            const result = await OrderServices.getAllOrdersFromDB();
            res.status(200).json({
                success: true,
                message: "Order fetched successfully!",
                data: result,
            });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: err });
    }
};

const getStatistics = async (req: Request, res: Response) => {
    try {
        const result = await OrderServices.getStatisticsFromDB();
        res.status(200).json({
            success: true,
            message: "Statistics fetched successfully!",
            data: result,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err });
    }
};

export const OrderControllers = {
    createOrder,
    getAllOrders,
    getStatistics,
};
