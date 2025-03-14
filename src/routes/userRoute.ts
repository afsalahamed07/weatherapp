import express from "express";
import {
  registerUser,
  getUsers,
  updateUser,
  weatherDay,
} from "../controllers/userContoller.js";

const router = express.Router();

router.post("/", registerUser);
router.get("/", getUsers);
router.put("/:id", updateUser);
router.get("/:id/weather", weatherDay);

export default router;
