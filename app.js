import express from "express";
import mongoose from "mongoose";
import postRouter from "./routes/Posts-route.js";

const app = express();

app.use(express.json());
app.use("/posts", postRouter);

// Connect to MongoDB and start the server
mongoose.connect("mongodb+srv://sjawad123:abcd1234@cluster0.rwiy7ix.mongodb.net/")
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(5000, () => {
            console.log("Server is running on port 5000");
        });
    })
    .catch((err) => console.log(err));