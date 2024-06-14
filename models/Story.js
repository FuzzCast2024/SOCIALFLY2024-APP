import mongoose from "mongoose";

const Schema = mongoose.Schema;

const storySchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    mediaUrl: {
        type: String,
        required: true,
    },
    mediaType: {
        type: String,
        enum: ["image", "video"],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: "24h",
    },
    views: [{ type: mongoose.Schema.Types.ObjectId,
         ref: "User"
    }],
    //privacy View
    allowedViewers: [{ type: mongoose.Schema.Types.ObjectId,
         ref: 'User' 
    }]

});

export default mongoose.model("Story",storySchema);