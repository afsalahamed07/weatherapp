import express from "express";
import {
  registerUser,
  getUsers,
  updateUser,
  weatherDay,
  login,
} from "../controllers/userContoller.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/", getUsers);
router.put("/:id", updateUser);
router.get("/:id/weather", weatherDay);
router.post("/login", login);

export default router;
