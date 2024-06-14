import Post from "../models/Posts.js";

export const getAllPosts = async (req, res) => {
    let allPosts;
    try {
        allPosts = await Post.find();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "An error occurred while fetching posts." });
    }
    if (!allPosts || allPosts.length === 0) {
        return res.status(404).json({ message: "No posts found" });
    }
    return res.status(200).json({ allPosts });
};


export const addPost = async (req, res) => {
    const { description, image, user } = req.body;
    const post = new Post({
        description,
        image,
        user,
    });
    try {
        await post.save();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "An error occurred while adding the post" });
    }
    return res.status(201).json({ post });
};

export const editPost = async(req, res) => {
    const {description} = req.body;
    const postId = req.params.id;
    let post;
    try{
        post = await Post.findByIdAndUpdate(postId, {
            description
        })
    } catch(err) {
        console.log(err);
    }
    if(!post){
        return res.status(500, json({message: "Unable To Edit The Post"}))
    }
    return res.status(200).json({ post });
}
export const getPostById = async (req, res) => {
    const id = req.params.id;
    let post;
    try{
        post = await Post.findById(id);
    }
    catch(err){
        console.log(err);
    }
    if (!post){
        return res.status(404).json({ message: "No Post Found"})
    }
    return res.status(200).json({ post });
}
export const deletePost = async (req, res) => {
    const id = req.params.id
    let post;
    try {
        post = await Post.findByIdAndDelete(id);
    }catch(err){
        console.log(err);
    }
    if(!post){
        return res.status(400).json({message: "Unable to Delete"});
    }
    return res.status(200).json({message: "Successfully Deleted"})
}