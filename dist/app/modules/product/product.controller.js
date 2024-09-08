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
exports.ProductControllers = void 0;
const product_service_1 = require("./product.service");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const createProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.ProductServices.createProductToDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Product created successfully!",
        data: result,
    });
}));
const getAllProducts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const name = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.name;
    const categories = (_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.categories;
    const brands = (_c = req === null || req === void 0 ? void 0 : req.query) === null || _c === void 0 ? void 0 : _c.brands;
    const ratings = (_d = req === null || req === void 0 ? void 0 : req.query) === null || _d === void 0 ? void 0 : _d.ratings;
    const sort = (_e = req === null || req === void 0 ? void 0 : req.query) === null || _e === void 0 ? void 0 : _e.sort;
    if (name || categories || brands || ratings || sort) {
        const result = yield product_service_1.ProductServices.getProductsByQueryFromDB(name, categories, brands, ratings, sort);
        if (result.length === 0) {
            (0, sendResponse_1.default)(res, {
                statusCode: http_status_1.default.NOT_FOUND,
                success: false,
                message: "No product found!",
                data: result,
            });
        }
        else {
            (0, sendResponse_1.default)(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: `Products matching filter term fetched successfully!`,
                data: result,
            });
        }
    }
    else {
        const result = yield product_service_1.ProductServices.getAllProductsFromDB();
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Products fetched successfully!",
            data: result,
        });
    }
}));
const getProductById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.productId;
    const result = yield product_service_1.ProductServices.getProductByIdFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Products fetched successfully!",
        data: result,
    });
}));
const updateProductById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.productId;
    const result = yield product_service_1.ProductServices.updateProductByIdToDB(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Products updated successfully!",
        data: result,
    });
}));
const deleteProductById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.productId;
    const result = yield product_service_1.ProductServices.deleteProductByIdFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Products deleted successfully!",
        data: result.deletedCount,
    });
}));
const getAllCategories = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.ProductServices.getAllCategoriesFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Categories fetched successfully!",
        data: result,
    });
}));
const getAllBrands = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.ProductServices.getAllBrandsFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Brands fetched successfully!",
        data: result,
    });
}));
const getProductsByCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = req.params.category;
    const result = yield product_service_1.ProductServices.getProductsByCategoryFromDB(category);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Products by category fetched successfully!",
        data: result,
    });
}));
const getProductsByTag = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tag = req.params.tag;
    const result = yield product_service_1.ProductServices.getProductsByTagFromDB(tag);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Products by tag fetched successfully!",
        data: result,
    });
}));
exports.ProductControllers = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById,
    getAllCategories,
    getAllBrands,
    getProductsByCategory,
    getProductsByTag,
};
