import express from "express";
import { OrderControllers } from "./order.controller";
const router = express.Router();

router.post("/create-order", OrderControllers.createOrder);

router.get("/get-all-orders", OrderControllers.getAllOrders);

router.get("/get-statistics", OrderControllers.getStatistics);

export const orderRoutes = router;
