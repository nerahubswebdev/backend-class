import express from "express";
import { getUsers, login, register } from "../controllers/userController.js";
import { checkAndRenewToken } from "../middleware/validate-token.js";

const router = express.Router();

router.post("/create", register);
router.post("/login", login);
router.get("/all-users", checkAndRenewToken, getUsers);

export default router;
