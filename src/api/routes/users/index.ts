import { Router } from "express";
import * as UserController from "../../controllers/userController";

const router = Router();

router.get("/", UserController.fetchUsers);

export default router;
