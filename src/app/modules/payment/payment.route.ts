import express from "express";
import { paymentController } from "./payment.controller";

const router = express.Router();

router.post("/create-order/confirmation", paymentController.confirmationControllerForCreateOrder);

router.get("/get-all-payments", paymentController.getAllPayments);

export const paymentRoutes = router;
