import slugify from "slugify"
import postModel from "../models/post.js";

export const creatPost = async (req, res) => {
    const {
        title,
        content,
        tags,
    } = req.body;
    try {
        const slug = slugify(title, { lower: true, strict: true });
        const post = await postModel.create({
            title,
            content,
            tags,
            slug
        });
        res.status(201).json(post)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getPost = async (req, res) => {
    try {
        const post = await postModel.find();
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getPostBySlug = async (req, res) => {
    try {
        const post = await postModel.findOne({ slug: req.params.slug });
        if (!post) return res.status(404).json({ message: "Post not found" })
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    try {
        const post = await postModel.findOne({ slug: req.params.slug });
        if (!post) return res.status(404).json({ message: "Post not found" })
        post.title = req.body.title;
        post.content = req.body.content;
        post.tags = req.body.tags;
        post.slug = slugify(req.body.title, { lower: true, strict: true });
        const updatedPost = await post.save();
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deletePost = async (req, res) => {
    try {
      const post = await postModel.findOne({ slug: req.params.slug });
  
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      await post.deleteOne();
      return res.json({ message: "Post deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };