import { TProduct } from "./product.interface";
import ProductModel from "./product.model";

const createProductToDB = async (productData: TProduct) => {
    const result = await ProductModel.create(productData);
    return result;
};

const getAllProductsFromDB = async () => {
    const result = await ProductModel.find();
    return result;
};

const getProductByIdFromDB = async (id: string) => {
    const result = await ProductModel.findOne({ _id: id });
    return result;
};

const updateProductByIdToDB = async (id: string, productData: TProduct) => {
    const result = await ProductModel.findOneAndUpdate({ _id: id }, productData, { new: true });
    return result;
};

const deleteProductByIdFromDB = async (id: string) => {
    const result = await ProductModel.deleteOne({ _id: id });
    return result;
};

const getProductsByQueryFromDB = async (
    name: string,
    categories: string,
    brands: string,
    ratings: string,
    sort: string,
) => {
    const categoryList = categories.split(",");
    const brandList = brands.split(",");
    const ratingList = ratings.split(",");

    let sortOption = {};
    if (sort === "price-asc") {
        sortOption = { price: 1 };
    } else if (sort === "price-desc") {
        sortOption = { price: -1 };
    }

    if (name) {
        const result = await ProductModel.find({ name: new RegExp(name, "i") });
        return result;
    } else if (categoryList.length > 0 || brandList.length > 0 || (ratingList.length > 0 && sort !== "")) {
        const result = await ProductModel.find({
            $or: [{ category: { $in: categoryList } }, { brand: { $in: brandList } }, { rating: { $in: ratingList } }],
        }).sort(sortOption);

        return result;
    } else {
        const result = await ProductModel.find({}).sort(sortOption);
        return result;
    }
};

const getProductQuantityFromDB = async (id: string) => {
    const result = await ProductModel.findById({ _id: id }, { inventory: 1, _id: 0 });
    return result?.inventory?.quantity || 0;
};

const updateProductInventoryToDB = async (id: string, updatedInventoryData: object) => {
    const result = await ProductModel.findOneAndUpdate({ _id: id }, { $set: { inventory: updatedInventoryData } });
    return result;
};

const getAllCategoriesFromDB = async () => {
    const result = await ProductModel.distinct("category");
    return result;
};

const getAllBrandsFromDB = async () => {
    const result = await ProductModel.distinct("brand");
    return result;
};

const getProductsByCategoryFromDB = async (category: string) => {
    const result = await ProductModel.find({ category });
    return result;
};

const getProductsByTagFromDB = async (tag: string) => {
    const result = await ProductModel.find({ tag });
    return result;
};

export const ProductServices = {
    createProductToDB,
    getAllProductsFromDB,
    getProductByIdFromDB,
    updateProductByIdToDB,
    deleteProductByIdFromDB,
    getProductsByQueryFromDB,
    getProductQuantityFromDB,
    updateProductInventoryToDB,
    getAllCategoriesFromDB,
    getAllBrandsFromDB,
    getProductsByCategoryFromDB,
    getProductsByTagFromDB,
};
