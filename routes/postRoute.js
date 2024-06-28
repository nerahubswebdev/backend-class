import express from "express";
import {
  deletePost,
  getPost,
  getPosts,
  newPost,
  updatePost,
} from "../controllers/postController.js";
import { checkAndRenewToken, isAdmin } from "../middleware/validate-token.js";

const router = express.Router();

router.post("/create", checkAndRenewToken, newPost);
router.get("/all-posts", checkAndRenewToken, getPosts);
router.get("/single-post/:id", getPost);
router.patch("/update/:id", checkAndRenewToken, updatePost);
router.delete("/delete/:postId", checkAndRenewToken, deletePost);

export default router;
