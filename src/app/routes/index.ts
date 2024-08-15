import { Router } from "express";

const router = Router();

const moduleRoutes = [
    {
        path: "/auth",
        route: "",
    },
    {
        path: "/products",
        route: "",
    },
];

// moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
