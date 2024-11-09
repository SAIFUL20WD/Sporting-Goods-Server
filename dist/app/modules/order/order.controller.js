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
exports.OrderControllers = void 0;
const order_service_1 = require("./order.service");
const payment_utils_1 = require("../payment/payment.utils");
const payment_modal_1 = __importDefault(require("../payment/payment.modal"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const product_model_1 = __importDefault(require("../product/product.model"));
// import ordervalidationSchema from "./order.validation";
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const orderData = req.body;
        orderData.products.forEach((product) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const databaseQuantity = yield product_model_1.default.findById(product.productId);
            if (!databaseQuantity) {
                throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Product not found");
            }
            const purchaseQuantity = product.qty;
            const newDBQuantity = ((_a = databaseQuantity === null || databaseQuantity === void 0 ? void 0 : databaseQuantity.inventory) === null || _a === void 0 ? void 0 : _a.quantity) - purchaseQuantity;
            const inventory = {
                quantity: newDBQuantity,
                inStock: newDBQuantity > 0 ? true : false,
            };
            const updatedProduct = yield product_model_1.default.findOneAndUpdate({ _id: product.productId }, { $set: { inventory } }, { new: true });
            if (!updatedProduct) {
                throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to update product quantity");
            }
        }));
        const result = yield order_service_1.OrderServices.createOrderToDB(orderData);
        if (orderData.user.payment === "online") {
            const transactionId = `TXN-${Date.now()}`;
            const paymentData = {
                transactionId: transactionId,
                totalPrice: orderData === null || orderData === void 0 ? void 0 : orderData.totalPrice,
                custormerName: (_a = orderData === null || orderData === void 0 ? void 0 : orderData.user) === null || _a === void 0 ? void 0 : _a.name,
                customerEmail: (_b = orderData === null || orderData === void 0 ? void 0 : orderData.user) === null || _b === void 0 ? void 0 : _b.email,
                customerPhone: (_c = orderData === null || orderData === void 0 ? void 0 : orderData.user) === null || _c === void 0 ? void 0 : _c.phone,
                customerAddress: (_d = orderData === null || orderData === void 0 ? void 0 : orderData.user) === null || _d === void 0 ? void 0 : _d.address,
            };
            const paymentSession = yield (0, payment_utils_1.initiatePayment)(paymentData);
            const newPayment = yield payment_modal_1.default.create({
                user: orderData === null || orderData === void 0 ? void 0 : orderData.user,
                orderId: result._id,
                transcationId: transactionId,
                status: "pending",
            });
            if (!newPayment) {
                throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to payment");
            }
            res.status(200).json({
                success: true,
                message: "Order created successfully!",
                data: paymentSession,
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Order created successfully!",
                data: result,
            });
        }
    }
    catch (err) {
        res.status(500).json({ success: false, message: err });
    }
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const email = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.email;
        if (email) {
            const result = yield order_service_1.OrderServices.getOrderByEmailFromDB(email);
            if (result.length === 0) {
                res.status(404).json({
                    success: false,
                    message: "Order not found!",
                });
            }
            else {
                res.status(200).json({
                    success: true,
                    message: "Orders fetched successfully for user email!",
                    data: result,
                });
            }
        }
        else {
            const result = yield order_service_1.OrderServices.getAllOrdersFromDB();
            res.status(200).json({
                success: true,
                message: "Order fetched successfully!",
                data: result,
            });
        }
    }
    catch (err) {
        res.status(500).json({ success: false, message: err });
    }
});
const getStatistics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_service_1.OrderServices.getStatisticsFromDB();
        res.status(200).json({
            success: true,
            message: "Statistics fetched successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err });
    }
});
exports.OrderControllers = {
    createOrder,
    getAllOrders,
    getStatistics,
};
