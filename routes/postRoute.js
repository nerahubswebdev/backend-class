import express from "express";
import { newPost } from "../controllers/postController.js";

const router = express.Router();

router.post("/create", newPost);

export default router;
