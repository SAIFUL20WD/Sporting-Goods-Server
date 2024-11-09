import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const createUser = catchAsync(async (req, res) => {
    const result = await UserServices.createUserIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User created succesfully",
        data: result,
    });
});

const getAllUsers = catchAsync(async (req, res) => {
    const result = await UserServices.getAllUsersFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users retirved succesfully",
        data: result,
    });
});

export const UserControllers = {
    createUser,
    getAllUsers,
};
