import { Router } from "express";
import { checkAuth } from "../middleware/check-auth";

import * as ProductController from "../controllers/productController";

const router = Router();

router.get("/", ProductController.fetchProducts);

router.delete("/:productId", checkAuth, ProductController.deleteProduct);

export default router;
