import { Request, Response } from "express";
import { OrderServices } from "./order.service";
import ordervalidationSchema from "./order.validation";
import { ProductServices } from "../product/product.service";

const createOrder = async (req: Request, res: Response) => {
    try {
        const orderData = req.body;
        const zodValidatedData = ordervalidationSchema.parse(orderData);
        const isProductAvailableInDB = await ProductServices.getProductByIdFromDB(zodValidatedData.productId);
        if (isProductAvailableInDB === null) {
            res.status(500).json({
                success: false,
                message: "Invalid Product ID",
            });
        } else {
            // Check ordered product quantity in DB
            const quantityAvailableInDB = await ProductServices.getProductQuantityFromDB(zodValidatedData.productId);
            // Check if ordered quantity exceeds product quantity
            if (quantityAvailableInDB < zodValidatedData.quantity) {
                res.status(500).json({
                    success: false,
                    message: "Insufficient quantity available in inventory",
                });
            } else {
                const currentQuantity = quantityAvailableInDB - zodValidatedData.quantity;
                const stock = currentQuantity === 0 ? false : true;
                const updatedInventoryData = {
                    quantity: currentQuantity,
                    inStock: stock,
                };
                const result = await OrderServices.createOrderToDB(zodValidatedData);
                // update product inventory data
                await ProductServices.updateProductInventoryToDB(zodValidatedData.productId, updatedInventoryData);
                res.status(200).json({
                    success: true,
                    message: "Order created successfully!",
                    data: result,
                });
            }
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

export const OrderControllers = {
    createOrder,
    getAllOrders,
};
