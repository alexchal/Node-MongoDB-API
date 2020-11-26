import { Router } from "express";
import * as AuthController from "../controllers/AuthController";

const router = Router();

router.post("/signup", AuthController.signUpUser);

router.post("/login", AuthController.loginUser);

router.delete("/:userId", AuthController.deleteUser);

export default router;
