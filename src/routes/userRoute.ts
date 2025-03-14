import express from "express";
import {
  registerUser,
  getUsers,
  updateUser,
} from "../controllers/userContoller.js";

const router = express.Router();

router.post("/", registerUser);
router.get("/", getUsers);
router.put("/:id", updateUser);

export default router;
