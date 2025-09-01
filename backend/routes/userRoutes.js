import express from "express";

import { protect } from "../middlewares/authMiddleware.js";
import { getMe, updateMe, getAllUsers } from "../controllers/userController.js";

const router = express.Router();

// admin can only view 
router.get("/", protect, getAllUsers);

router.get("/me", protect, getMe);
router.put("/me", protect, updateMe);
export default router;