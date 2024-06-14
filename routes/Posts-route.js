import express from "express";
import { addPost, deletePost, editPost, getAllPosts, getPostById } from "../controllers/Posts-controllers.js";

const postRouter = express.Router();

postRouter.get("/", getAllPosts);
postRouter.post("/add", addPost);
postRouter.put("/edit/:id", editPost);
postRouter.get("/:id", getPostById);
postRouter.delete("/:id", deletePost);

export default postRouter;