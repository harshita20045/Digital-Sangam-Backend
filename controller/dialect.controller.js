import { Dialect } from "../models/dialect.model.js";


export const createDialect = async (req, res) => {
  try {
    const { word, meaning, language, author, example } = req.body;
    const audioFile = req.file; // multer adds this

    if (!word || !meaning || !language || !author || !example || !audioFile) {
      return res.status(400).json({ error: "All fields including audio file are required." });
    }

    const audioPath = `/uploads/audio/${audioFile.filename}`;

    const dialect = await Dialect.create({
      word: word.trim(),
      meaning: meaning.trim(),
      language: language.trim(),
      example: example.trim(),
      audioLink: audioPath,
      author,
    });

    res.status(201).json({ message: "Dialect submitted for review", dialect });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create dialect" });
  }
};


export const getUserDialects = async (req, res) => {
  try {
    const dialects = await Dialect.find({ author: req.user.id });
    res.status(200).json({ dialects });
  } catch (err) {
    res.status(500).json({ error: "Error fetching your dialects" });
  }
};

// ------------------ ADMIN APIs ------------------


export const getAllDialects = async (req, res) => {
  try {
   
    const dialects = await Dialect.find().populate("author", "name email");
    res.status(200).json({ dialects });
  } catch (err) {
    res.status(500).json({ error: "Error fetching dialects" });
  }
};

// Approve or Reject a dialect
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

