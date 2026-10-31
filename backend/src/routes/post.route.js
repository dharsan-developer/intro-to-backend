import { Router } from "express";
import { createPost, getAllPosts, updatePost, deletePost } from "../controllers/post.controller.js";

const router = Router();

router.route('/createPost').post(createPost);
router.route('/getAllPosts').get(getAllPosts);
router.route('/updatePost/:id').put(updatePost);
router.route('/deletePost/:id').delete(deletePost);

export default router;