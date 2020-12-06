import { Router } from "express";
import { cacheRequest } from "../../middleware/cache";
import * as UserController from "../../controllers/userController";

const router = Router();

router.get("/", cacheRequest, UserController.fetchUsers);

export default router;
