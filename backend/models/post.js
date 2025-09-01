import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    slug:
    {
        type: String, required: true, unique: true
    },
    tags: [{
        type: String
    }],
    bio : {
        type : String,
        default : ""
    },
    avatar : {
        type : String,
        default : ""
    }
},
    { timestamps: true }
);

const postModel = mongoose.model("Post", postSchema)
export default postModel;