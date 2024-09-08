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
const order_validation_1 = __importDefault(require("./order.validation"));
const product_service_1 = require("../product/product.service");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        const zodValidatedData = order_validation_1.default.parse(orderData);
        const isProductAvailableInDB = yield product_service_1.ProductServices.getProductByIdFromDB(zodValidatedData.productId);
        if (isProductAvailableInDB === null) {
            res.status(500).json({
                success: false,
                message: "Invalid Product ID",
            });
        }
        else {
            // Check ordered product quantity in DB
            const quantityAvailableInDB = yield product_service_1.ProductServices.getProductQuantityFromDB(zodValidatedData.productId);
            // Check if ordered quantity exceeds product quantity
            if (quantityAvailableInDB < zodValidatedData.quantity) {
                res.status(500).json({
                    success: false,
                    message: "Insufficient quantity available in inventory",
                });
            }
            else {
                const currentQuantity = quantityAvailableInDB - zodValidatedData.quantity;
                const stock = currentQuantity === 0 ? false : true;
                const updatedInventoryData = {
                    quantity: currentQuantity,
                    inStock: stock,
                };
                const result = yield order_service_1.OrderServices.createOrderToDB(zodValidatedData);
                // update product inventory data
                yield product_service_1.ProductServices.updateProductInventoryToDB(zodValidatedData.productId, updatedInventoryData);
                res.status(200).json({
                    success: true,
                    message: "Order created successfully!",
                    data: result,
                });
            }
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
exports.OrderControllers = {
    createOrder,
    getAllOrders,
};
