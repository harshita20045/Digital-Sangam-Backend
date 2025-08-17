import {Like} from "../models/like.model.js";

export const addLike = async (req, res) => {
  try {
    const { userId, articleId } = req.body;
     console.log("Adding like for user:", userId, "on article:", articleId);
   const newLike = new Like({ user: userId, article: articleId });
    await newLike.save();
    const numberOfLikes = await Like.countDocuments({ articleId });
    res.status(201).json({ message: "Like added successfully", numberOfLikes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add like" });
  }
};

export const removeLike = async (req, res) => {
  try {
    const { userId, articleId } = req.body;
    await Like.findOneAndDelete({ userId, articleId });
    res.status(200).json({ message: "Like removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to remove like" });
  }
};

export const getNumberOfLikes = async (req, res) => {
  try {
    const { articleId } = req.params;
    const numberOfLikes = await Like.countDocuments({ article: articleId });
    res.status(200).json({ articleId, numberOfLikes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve likes" });
  }
};
