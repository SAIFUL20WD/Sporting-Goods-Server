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

export const OrderServices = {
    createOrderToDB,
    getAllOrdersFromDB,
    getOrderByEmailFromDB,
};
