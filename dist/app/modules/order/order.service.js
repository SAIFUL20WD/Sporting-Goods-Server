"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const product_model_1 = __importDefault(require("../product/product.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const order_model_1 = __importDefault(require("./order.model"));
const createOrderToDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.create(orderData);
    return result;
});
const getAllOrdersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.find();
    return result;
});
const getOrderByEmailFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.find({ email });
    return result;
});
const getStatisticsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const ordersCount = yield order_model_1.default.countDocuments();
    const usersCount = yield user_model_1.default.countDocuments();
    const productsCount = yield product_model_1.default.countDocuments();
    const totalRevenue = yield order_model_1.default.aggregate([
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
});
exports.OrderServices = {
    createOrderToDB,
    getAllOrdersFromDB,
    getOrderByEmailFromDB,
    getStatisticsFromDB,
};
