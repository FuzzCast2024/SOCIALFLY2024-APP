import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostsSchema = new Schema({
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

export default mongoose.model("Post", PostsSchema);