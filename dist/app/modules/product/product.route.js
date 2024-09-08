"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const product_validation_1 = __importStar(require("./product.validation"));
const router = express_1.default.Router();
router.post("/create-product", (0, auth_1.default)(), (0, validateRequest_1.default)(product_validation_1.default), product_controller_1.ProductControllers.createProduct);
router.get("/get-products", product_controller_1.ProductControllers.getAllProducts);
router.get("/get-categories", product_controller_1.ProductControllers.getAllCategories);
router.get("/get-brands", product_controller_1.ProductControllers.getAllBrands);
router.get("/getProductsByCategory/:category", product_controller_1.ProductControllers.getProductsByCategory);
router.get("/getProductsByTag/:tag", product_controller_1.ProductControllers.getProductsByTag);
router.get("/:productId", product_controller_1.ProductControllers.getProductById);
router.put("/:productId", (0, auth_1.default)(), (0, validateRequest_1.default)(product_validation_1.productUpdateValidationSchema), product_controller_1.ProductControllers.updateProductById);
router.delete("/:productId", (0, auth_1.default)(), product_controller_1.ProductControllers.deleteProductById);
exports.ProductRoutes = router;
