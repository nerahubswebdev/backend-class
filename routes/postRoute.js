import express from "express";
import { newPost } from "../controllers/postController.js";
import { checkAndRenewToken } from "../middleware/validate-token.js";

const router = express.Router();

router.post("/create", checkAndRenewToken, newPost);

export default router;
