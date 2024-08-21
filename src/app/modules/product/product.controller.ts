import { ProductServices } from "./product.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createProduct = catchAsync(async (req, res) => {
    const result = await ProductServices.createProductToDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product created successfully!",
        data: result,
    });
});

const getAllProducts = catchAsync(async (req, res) => {
    const searchTerm = req?.query?.searchTerm;
    if (searchTerm) {
        const result = await ProductServices.getProductsByQueryFromDB(searchTerm as string);
        if (result.length === 0) {
            sendResponse(res, {
                statusCode: httpStatus.NOT_FOUND,
                success: false,
                message: "No product found!",
                data: result,
            });
        } else {
            sendResponse(res, {
                statusCode: httpStatus.OK,
                success: true,
                message: `Products matching search term '${searchTerm}' fetched successfully!`,
                data: result,
            });
        }
    } else {
        const result = await ProductServices.getAllProductsFromDB();

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Products fetched successfully!",
            data: result,
        });
    }
});

const getProductById = catchAsync(async (req, res) => {
    const id = req.params.productId;
    const result = await ProductServices.getProductByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Products fetched successfully!",
        data: result,
    });
});

const updateProductById = catchAsync(async (req, res) => {
    const id = req.params.productId;
    const result = await ProductServices.updateProductByIdToDB(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Products updated successfully!",
        data: result,
    });
});

const deleteProductById = catchAsync(async (req, res) => {
    const id = req.params.productId;
    const result = await ProductServices.deleteProductByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Products deleted successfully!",
        data: result.deletedCount,
    });
});

export const ProductControllers = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById,
};
