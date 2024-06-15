import express from "express";
import { addPost, deletePost, editPost, getAllPosts, getPostById } from "../controllers/Posts-controllers.js";
import multer from "multer";
import authenticateToken from "../middleware/authenticateToken.js"


const upload = multer({ dest: 'uploads/' });
const postRouter = express.Router();

postRouter.get("/post",authenticateToken, getAllPosts);
postRouter.post("/post/add", authenticateToken, upload.single('media'), addPost);
postRouter.put("/post/edit/:id",authenticateToken, editPost);
postRouter.get("/post/:id",authenticateToken, getPostById);
postRouter.delete("/post/:id",authenticateToken, deletePost);


export default postRouter;