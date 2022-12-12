import { Router } from "express";
import {
  createPost,
  findPosts,
} from "../controllers/posts.controller.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";

const router = Router();

router.use(authValidation);

router.post("/posts", createPost);
router.get("/posts", findPosts);

export default router;
