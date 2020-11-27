import { Request, Response, NextFunction } from "express";
import multer from "multer";
import * as ProductService from "../services/productService";

const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb) {
        cb(null, "");
    },
    filename: function (req: Request, file: Express.Multer.File, cb) {
        cb(null, new Date().toDateString() + file.originalname);
    }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        //accept a file
        cb(null, true);
    } else {
        // reject a file
        cb(new Error("You can only upload image/jpeg or image/png"), false);
    }
};

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter
});

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
