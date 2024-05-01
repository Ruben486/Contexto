import { Router } from "express";
import { getPosts,createPost,updatePost,deletePost,getPost } from "../controlers/post.controlers.js"

const router = Router();
router.get("/posts",getPosts);
router.post("/post",createPost);
router.put("/post/:id",updatePost);
router.delete("/post/:id",deletePost);
router.get("/post/:id",getPost);


export default router;