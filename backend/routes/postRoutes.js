import express from "express";
import { creatPost, getPost, getPostBySlug, updatePost, deletePost } from "../controllers/postController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", creatPost);
router.get("/", getPost);
router.get("/:slug", getPostBySlug);
router.put("/:slug", protect, authorizeRoles("admin"), updatePost);
router.delete("/:slug", protect, authorizeRoles("admin"), deletePost);


export default router;
