import { Dialect } from "../models/dialect.model.js";

export const createDialect = async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: "Audio file is required" });
    }

    const newDialect = new Dialect({
      word: req.body.word,
      meaning: req.body.meaning,
      language: req.body.language,
      examples: req.body.examples,
      author: req.body.author,
      audioLink: req.file.path 
    });

    const savedDialect = await newDialect.save();
    res.status(201).json(savedDialect);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getUserDialects = async (req, res) => {
  try {
    const { id } = req.params;
    const dialects = await Dialect.find({ author: id }).populate("language", "language").populate("author", "name email");
    res.status(200).json({ dialects });
  } catch (err) {
    res.status(500).json({ error: "Error fetching your dialects" });
  }
};

export const getAllDialects = async (req, res) => {
  try {
    const dialects = await Dialect.find().populate("author", "name email").populate("language", "language");
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
