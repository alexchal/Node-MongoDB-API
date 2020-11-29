import mongoose from "mongoose";
import { Product, ProductType } from "../models/product";

export const fetchProducts = (): Promise<ProductType[]> => {
    return Product.find().exec();
};

export const fetchProduct = (
    productId: string
): Promise<ProductType | null> => {
    return Product.findById(productId)
        .select("_id name price productImage")
        .exec();
};

export const addProduct = async (
    name: string,
    price: number,
    file: Express.Multer.File
): Promise<ProductType> => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name,
        price,
        productImage: file.path
    });

    return product.save();
};

export const deleteProduct = (
    productId: string
): Promise<
    {
        ok?: number | undefined;
        n?: number | undefined;
    } & {
        deletedCount?: number | undefined;
    }
> => {
    return Product.deleteOne({ _id: productId }).exec();
};
