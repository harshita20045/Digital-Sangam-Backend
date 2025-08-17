// routes/speech.route.js
import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/generate", async (req, res) => {
  const { text, languageModel } = req.body;

  if (!text || !languageModel) {
    return res.status(400).json({ error: "Text and languageModel are required" });
  }

  try {
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${languageModel}`,
      { inputs: text },
      {
        responseType: "arraybuffer",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const audioBuffer = Buffer.from(response.data);
    res.set({
      "Content-Type": "audio/wav",
      "Content-Length": audioBuffer.length,
    });
    res.send(audioBuffer);
  } catch (err) {
    console.error("Hugging Face TTS Error:", err.response?.data || err.message);
    res.status(err.response?.status || 500).json({ error: "Failed to generate speech" });
  }
});

export default router;
