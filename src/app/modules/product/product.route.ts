import express from "express";
import { ProductControllers } from "./product.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import productValidationSchema, { productUpdateValidationSchema } from "./product.validation";
const router = express.Router();

router.post("/create-product", auth(), validateRequest(productValidationSchema), ProductControllers.createProduct);

router.get("/get-products", ProductControllers.getAllProducts);

router.get("/get-categories", ProductControllers.getAllCategories);

router.get("/getProductsByCategory/:category", ProductControllers.getProductsByCategory);

router.get("/:productId", ProductControllers.getProductById);

router.put("/:productId", auth(), validateRequest(productUpdateValidationSchema), ProductControllers.updateProductById);

router.delete("/:productId", auth(), ProductControllers.deleteProductById);

export const ProductRoutes = router;
