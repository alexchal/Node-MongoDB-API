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

export const fetchProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { productId } = req.params;

    try {
        const product = await ProductService.fetchProduct(productId);

        const response = {
            product: product
                ? res.status(200).json({
                      product
                  })
                : res
                      .status(404)
                      .json({ message: "No valid entry found for provided ID" })
        };

        return response;
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
        const {
            file,
            body: { name, price }
        } = req;

        if (!file) {
            throw "Please provide an image";
        }

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
        const results = await ProductService.deleteProduct(productId);

        if (results.deletedCount === 0) throw "The product does not exist";

        res.status(200).json({
            message: "Product deleted",
            request: {
                type: "GET",
                url: "http://localhost:8080/api/products/"
            }
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
};
