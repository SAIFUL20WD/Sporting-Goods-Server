import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import userValidationSchema from "./user.validation";

const router = express.Router();

router.post("/create-user", validateRequest(userValidationSchema), UserControllers.createUser);

router.get("/get-all-users", UserControllers.getAllUsers);

export const UserRoutes = router;
