import Post from "../models/Posts.js";

export const getAllPosts = async (req, res) => {
    let allPosts;
    try {
        allPosts = await Post.find();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "An error occurred while fetching posts." });
    }
    if (!allPosts) {
        return res.status(404).json({ message: "No posts found" });
    }
    return res.status(200).json({ allPosts });
};


export const addPost = async (req, res) => {
    const { user } = req;
    const { mediaType, description } = req.body;
    const mediaUrl = req.file.path;
    const post = new Post({
        user: user._id,
        mediaUrl,
        mediaType,
        description,
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
    const {description, user} = req.body;
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
    if (post.user.toString() !== user._id.toString()) {
        return res.status(403).json({ error: 'User not authorized to edit this post' });
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
    const { user } = req;
    let post;
    try {
        post = await Post.findByIdAndDelete(id);
    }catch(err){
        console.log(err);
    }
    if(!post){
        return res.status(400).json({message: "Unable to Delete"});
    }
    if (post.user.toString() !== user._id.toString()) {
        return res.status(403).json({ error: 'User not authorized to delete this post' });
      }
    return res.status(200).json({message: "Successfully Deleted"})
}

export const viewPost = async (req, res) => {
    const { user } = req;
    const { id } = req.params;
  
    try {
      const post = await Post.findById(id);
      if (!post.views.includes(user._id)) {
        post.views.push(user._id);
        await post.save();
      }
      return res.sendStatus(200);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
};

