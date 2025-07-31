import { Comment } from "../models/comment.model.js";
import { Article } from "../models/article.model.js";

export const addComment = async (req, res) => {
  try {
    const { articleId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    const article = await Article.findById(articleId);
    if (!article) return res.status(404).json({ message: "Article not found" });

    const comment = await Comment.create({
      article: articleId,
      user: userId,
      content,
    });

    res.status(201).json({ message: "Comment added", comment });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;
    const role = req.user.role;

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.user.toString() !== userId && role !== "admin") {
      return res.status(403).json({ message: "Not allowed to delete this comment" });
    }

    await Comment.findByIdAndDelete(commentId);
    res.status(200).json({ message: "Comment deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCommentsOnArticle = async (req, res) => {
  try {
    const { articleId } = req.params;

    const comments = await Comment.find({ article: articleId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ message: "Comments on Article", comments });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCommentsByUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const comments = await Comment.find({ user: userId })
      .populate("article", "title")
      .sort({ createdAt: -1 });

    res.status(200).json({ message: "Your Comments", comments });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
