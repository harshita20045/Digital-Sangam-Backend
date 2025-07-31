import { Dialect } from "../models/dialect.model.js";

// ------------------ USER APIs ------------------

export const createDialect = async (req, res) => {
  try {
    const { word, meaning, language, example, audioLink } = req.body;
    const dialect = await Dialect.create({
      word,
      meaning,
      language,
      example,
      audioLink,
      author: req.user.id, 
    });
    res.status(201).json({ message: "Dialect submitted for review", dialect });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create dialect" });
  }
};

// View all dialects by the current user
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
    const { status } = req.query;
    const query = status ? { status } : {};
    const dialects = await Dialect.find(query).populate("author", "name email");
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

// Delete dialect (admin only)
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

