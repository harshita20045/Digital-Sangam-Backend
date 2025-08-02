import { Language } from "../models/language.model.js";

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

export const deleteLanguage = async (request, response, next) => {
  try {
    
    let language=await Language.deleteOne({id})
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: "Internal Server Error" });
  }
};
