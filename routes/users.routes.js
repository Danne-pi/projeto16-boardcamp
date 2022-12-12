import { Router } from "express";
import { signIn, signUp } from "../controllers/users.controller.js";
import { signInBodyValidation } from "../middlewares/signInBodyValidation.middleware.js";
import { signUpBodyValidation } from "../middlewares/signUpBodyValidation.middleware.js";

const router = Router();

router.post("/sign-up", signUpBodyValidation, signUp);
router.post("/sign-in", signInBodyValidation, signIn);

export default router;
