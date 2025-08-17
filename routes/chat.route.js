import express from "express";
import genAI from "../config/geminiClient.js";

const router = express.Router();

router.post("/ai-generate", async (req, res) => {
  try {
    const { type, input ,content} = req.body;
   

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    
    let prompt = "";
    if (type === "enhance") {
      console.log(!!input);
      if(!!input){
        prompt = `please ${input}:- ${content} `;
      }
      else
        prompt = `please enhance the following text: ${content} `; 
    } else if (type === "topic") {
      prompt = `Write a detailed article about: ${input}`;
    } else {
      prompt = "Write a creative article on Indian culture.";
    }

   
    const result = await model.generateContent(prompt);

    res.json({
      generatedText: result.response.text(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI generation failed" });
  }
});

router.post("/example", async (req, res) => {
  try {
    const { word } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


    let prompt = `Give the meaning of this word in which language it is written and also give some examples in word's language and meaning of sentence in hindi and english : ${word}`;

    const result = await model.generateContent(prompt);

    res.json({
      generatedText: result.response.text(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI generation failed" });
  }
});

export default router;
