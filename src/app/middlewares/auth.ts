import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import catchAsync from "../utils/catchAsync";
import UserModel from "../modules/user/user.model";

const auth = () => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;

        // checking if the token is missing
        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
        }

        // checking if the given token is valid
        const decoded = jwt.verify(token, config.JWT_SECRET_KEY as string) as JwtPayload;

        const { email } = decoded;

        // checking if the user is exist
        const user = await UserModel.findOne({ email: email });

        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, "No user found!");
        }

        req.user = decoded as JwtPayload;
        next();
    });
};

export default auth;
