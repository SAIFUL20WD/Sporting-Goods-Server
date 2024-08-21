import bcrypt from "bcrypt";
import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { TLoginUser } from "./auth.interface";
import { createToken } from "./auth.utils";
import UserModel from "../user/user.model";
import { TUser } from "../user/user.interface";

const loginUser = async (payload: TLoginUser) => {
    const user: TUser | null = await UserModel.findOne({ email: payload.email });

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "No user found!");
    }

    //checking if the password is correct
    const isPasswordValid = await bcrypt.compare(payload.password, user?.password);
    if (!isPasswordValid) throw new AppError(httpStatus.FORBIDDEN, "Password does not match!");

    const token = createToken({ email: user?.email }, config.JWT_SECRET_KEY as string, "10d");

    return token;
};

export const AuthServices = {
    loginUser,
};
