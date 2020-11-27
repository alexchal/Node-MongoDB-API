import { Router } from "express";
import { checkAuth } from "../middleware/checkAuth";
import { upload } from "../middleware/uploadPicture";

import * as ProductController from "../controllers/productController";

const router = Router();

router.get("/", ProductController.fetchProducts);

router.post(
    "/",
    checkAuth,
    upload.single("productImage"),
    ProductController.addProduct
);

router.delete("/:productId", checkAuth, ProductController.deleteProduct);

export default router;
