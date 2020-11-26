import { Router } from "express";
import * as ProductController from "../controllers/productController";

const router = Router();

router.get("/", ProductController.fetchProducts);

export default router;
