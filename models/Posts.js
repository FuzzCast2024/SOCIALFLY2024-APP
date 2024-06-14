import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostsSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    mediaUrl: {
        type: String,
        required: false,
    },
    mediaType: {
        type: String,
        enum: ["image", "video"],
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    views: [{ type: mongoose.Schema.Types.ObjectId,
         ref: "User"
    }]
});

export default mongoose.model("Post", PostsSchema);