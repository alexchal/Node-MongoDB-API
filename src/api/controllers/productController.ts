import { Request, Response, NextFunction } from "express";
import * as ProductService from "../services/productService";

export const fetchProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const products = await ProductService.fetchProducts();

        const response = {
            count: products.length,
            products: products.map((product) => {
                return {
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    productImage: product.productImage,
                    request: {
                        type: "GET",
                        url: `http://localhost:8080/api/products/${product._id}`
                    }
                };
            })
        };

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export const addProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name, price } = req.body;
        const { file } = req;

        const product = await ProductService.addProduct(name, price, file);

        const response = {
            message: "Create product successfully",
            createdProduct: {
                _id: product._id,
                name: product.name,
                price: product.price,
                productImage: product.productImage
            }
        };

        return res.status(201).json({ response });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export const deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { productId } = req.params;

    try {
        await ProductService.deleteProduct(productId);

        res.status(200).json({
            message: "Product deleted",
            request: {
                type: "POST",
                url: "http://localhost:8080/api/products/",
                body: {
                    name: "String",
                    price: "Number"
                }
            }
        });
    } catch (error) {
        return res.status(500).json({
            message:
                "Ooops something went wrong. Make sure you pass the correct productId"
        });
    }
};
