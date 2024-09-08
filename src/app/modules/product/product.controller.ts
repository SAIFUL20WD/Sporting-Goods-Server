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
    const name = req?.query?.name as string;
    const categories = req?.query?.categories as string;
    const brands = req?.query?.brands as string;
    const ratings = req?.query?.ratings as string;
    const sort = req?.query?.sort as string;
    if (name || categories || brands || ratings || sort) {
        const result = await ProductServices.getProductsByQueryFromDB(name, categories, brands, ratings, sort);
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
                message: `Products matching filter term fetched successfully!`,
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

const getAllCategories = catchAsync(async (req, res) => {
    const result = await ProductServices.getAllCategoriesFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Categories fetched successfully!",
        data: result,
    });
});

const getAllBrands = catchAsync(async (req, res) => {
    const result = await ProductServices.getAllBrandsFromDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Brands fetched successfully!",
        data: result,
    });
});

const getProductsByCategory = catchAsync(async (req, res) => {
    const category = req.params.category;
    const result = await ProductServices.getProductsByCategoryFromDB(category);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Products by category fetched successfully!",
        data: result,
    });
});

const getProductsByTag = catchAsync(async (req, res) => {
    const tag = req.params.tag;
    const result = await ProductServices.getProductsByTagFromDB(tag);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Products by tag fetched successfully!",
        data: result,
    });
});

export const ProductControllers = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById,
    getAllCategories,
    getAllBrands,
    getProductsByCategory,
    getProductsByTag,
};
