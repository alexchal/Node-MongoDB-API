import { Product, ProductType } from "../models/product";

export const fetchProducts = (): Promise<ProductType[]> => {
    return Product.find().exec();
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
