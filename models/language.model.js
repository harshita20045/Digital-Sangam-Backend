import mongoose from "mongoose";

let languageSchema=new mongoose.Schema({
  language:{
    type:String,
    unique:true
  }
})
export const Language= mongoose.model("language",languageSchema)