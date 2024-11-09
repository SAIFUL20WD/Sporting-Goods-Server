"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const product_route_1 = require("../modules/product/product.route");
const auth_route_1 = require("../modules/auth/auth.route");
const payment_route_1 = require("../modules/payment/payment.route");
const order_route_1 = require("../modules/order/order.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/users",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/products",
        route: product_route_1.ProductRoutes,
    },
    {
        path: "/orders",
        route: order_route_1.orderRoutes,
    },
    {
        path: "/payments",
        route: payment_route_1.paymentRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
