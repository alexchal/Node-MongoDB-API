import { Router, Request, Response, NextFunction } from "express";
import multer from "multer";
// Models
import { Product } from "../models/product";

const router = Router();

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

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    Product.find()
        .exec()
        .then((docs) => {
            const response = {
                count: docs.length,
                products: docs.map((doc) => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        price: doc.price,
                        productImage: doc.productImage,
                        request: {
                            type: "GET",
                            url: `http://localhost:8080/api/products/${doc._id}`
                        }
                    };
                })
            };

            res.status(200).json(response);
        })
        .catch((error: Error) => {
            res.status(500).json({ error });
        });
});

export default router;
