import ProductModel from "../product/product.model";
import UserModel from "../user/user.model";
import { TOrder } from "./order.interface";
import OrderModel from "./order.model";

const createOrderToDB = async (orderData: TOrder) => {
    const result = await OrderModel.create(orderData);
    return result;
};

const getAllOrdersFromDB = async () => {
    const result = await OrderModel.find();
    return result;
};

const getOrderByEmailFromDB = async (email: string) => {
    const result = await OrderModel.find({ email });
    return result;
};

const getStatisticsFromDB = async () => {
    const ordersCount = await OrderModel.countDocuments();
    const usersCount = await UserModel.countDocuments();
    const productsCount = await ProductModel.countDocuments();
    const totalRevenue = await OrderModel.aggregate([
        {
            $group: {
                _id: null,
                totalRevenue: {
                    $sum: "$totalPrice",
                },
            },
        },
    ]);
    const result = { ordersCount, usersCount, productsCount, totalRevenue };
    return result;
};

export const OrderServices = {
    createOrderToDB,
    getAllOrdersFromDB,
    getOrderByEmailFromDB,
    getStatisticsFromDB,
};
