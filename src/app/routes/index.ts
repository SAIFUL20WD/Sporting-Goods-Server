import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { ProductRoutes } from "../modules/product/product.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { paymentRoutes } from "../modules/payment/payment.route";
import { orderRoutes } from "../modules/order/order.route";

const router = Router();

const moduleRoutes = [
    {
        path: "/users",
        route: UserRoutes,
    },
    {
        path: "/auth",
        route: AuthRoutes,
    },
    {
        path: "/products",
        route: ProductRoutes,
    },
    {
        path: "/orders",
        route: orderRoutes,
    },
    {
        path: "/payments",
        route: paymentRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
