import { Article } from "../models/article.model.js";
import { Dialect } from "../models/dialect.model.js";
import { Language } from "../models/language.model.js";
import { User } from "../models/user.model.js";


export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate("author", "name email");
    res.status(200).json({ articles });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error fetching articles" });
  }
};

export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalArticles = await Article.countDocuments();
    const totalLanguages = await Language.countDocuments();
    const totalDialects = await Dialect.countDocuments();

    res.json({
      users: totalUsers,
      articles: totalArticles,
      languages: totalLanguages,
      dialects: totalDialects,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats", error });
  }
};
export const updateArticleStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }
    const article = await Article.findByIdAndUpdate(id, { status }, { new: true });
    res.status(200).json({ message: `Article ${status}`, article });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Failed to update article status" });
  }
};





export const getAllDialects = async (req, res) => {
  try {
   
    const dialects = await Dialect.find().populate("author", "name email");
    res.status(200).json({ dialects });
  } catch (err) {
    res.status(500).json({ error: "Error fetching dialects" });
  }
};


export const updateDialectStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }
    const dialect = await Dialect.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.status(200).json({ message: `Dialect ${status}`, dialect });
  } catch (err) {
    res.status(500).json({ error: "Failed to update dialect status" });
  }
};

export const deleteDialect = async (req, res) => {
  try {
    const { id } = req.params;
    await Dialect.findByIdAndDelete(id);
    res.status(200).json({ message: "Dialect deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting dialect" });
  }
};


export const getApprovedDialects = async (req, res) => {
  try {
    const dialects = await Dialect.find({ status: "approved" });
    res.status(200).json({ dialects });
  } catch (err) {
    res.status(500).json({ error: "Error fetching approved dialects" });
  }
};


export const createLanguage = async (request, response, next) => {
  try {
    const { language } = request.body;

    let languageName = await Language.create({ language });
    return response
      .status(201)
      .json({ message: "Language Added", languageName });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllLanguage = async (request, response, next) => {
  try {
    let languageName = await Language.find();
    return response
      .status(201)
      .json({ message: "All Languages", languageName });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: "Internal Server Error" });
  }
};
export const deleteLanguage = async (req, res) => {
  try {
    const { id } = req.params;
    const language = await Language.findByIdAndDelete(id);
    if (!language) {
      return res.status(404).json({ message: "Language not found" });
    }
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
