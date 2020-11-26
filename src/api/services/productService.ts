import { Product } from "../models/product";

export const fetchProducts = () => {
    return Product.find().exec();
};
