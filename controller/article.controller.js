import { Article } from "../models/article.model.js";

// http://localhost:3000/article --------->post
/*
Data :-
{  "title": "Sample Article",
  "content": "This is a sample article content.",
  "category": "Technology",
  "status": "pending",
  "images": ["image1.jpg", "image2.jpg"] 
}
*/
export const createArticle = async (request, response) => {
  try {
    const { title, content, category, status, author,shortDescription } = request.body;
    const images = request.files?.map(file => file.filename) || [];
    

    // Calculate estimated read time (words / 200 words per minute)
    const wordCount = content.trim().split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);

    const article = await Article.create({
      title,
      content,
      shortDescription,
      readTime,
      category,
      author,
      status,
      images,
    });

    return response.status(201).json({ message: "Article created successfully", article });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Internal server error" });
  }
};


// http://localhost:3000/article/my-articles --------->get
export const seeMyArticles = async (request, response) => {
  try {
    const articles = await Article.find({ author: request.user.id });
    return response.status(200).json(articles);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Internal server error" });
  }
}

// http://localhost:3000/article/all --------->get
export const seeAllArticles = async (request, response) => {
  try {
    const articles = await Article.find().populate("author", "name email");
    return response.status(200).json(articles);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Internal server error" });
  }
}

export const seeArticleById = async (request, response) => {
  try {
    const { id } = request.params;
    const article = await Article.findById(id).populate("author", "name email");
    if (!article) {
      return response.status(404).json({ message: "Article not found" });
    }
    return response.status(200).json(article);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Internal server error" });
  }
}

// http://localhost:3000/article/:id --------->get
export const updateArticle = async (request, response) => {
  try {
    const { id } = request.params;
    const { title, content, category, status } = request.body;
    const images = request.files ? request.files.map(file => file.filename) : undefined;

    const article = await Article.findByIdAndUpdate(
      id,
      { title, content, category, status, images },
      { new: true }
    ).populate("author", "name email");

    if (!article) {
      return response.status(404).json({ message: "Article not found" });
    }

    return response.status(200).json({ message: "Article updated successfully", article });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Internal server error" });
  }
}

// http://localhost:3000/article/:id --------->delete
export const deleteArticle = async (request, response) => {
  try {
    const { id } = request.params;
    const article = await Article.findByIdAndDelete(id);
    if (!article) {
      return response.status(404).json({ message: "Article not found" });
    }
    return response.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Internal server error" });
  }
}

// http://localhost:3000/article/:id --------->get
export const getArticleById = async (request, response) => {
  try {
    const { id } = request.params;
    const article = await Article.findById(id).populate("author", "name email");
    if (!article) {
      return response.status(404).json({ message: "Article not found" });
    }
    return response.status(200).json(article);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Internal server error" });
  }
}

// http://localhost:3000/article/author/:authorId --------->get
export const seeArticleByAuthor = async (request, response) => {
  try {
    const { authorId } = request.params;
    const articles = await Article.find({ author: authorId }).populate("author", "name email");
    if (articles.length === 0) {
      return response.status(404).json({ message: "No articles found for this author" });
    }
    return response.status(200).json(articles);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Internal server error" });
  }
}

// http://localhost:3000/article/author/category --------->get
export const seeArticlesByCategory = async (request, response) => {
  try {
    const { category } = request.body;
    const articles = await Article.find({ category: category }).populate("author", "name email");
    if (articles.length === 0) {
      return response.status(404).json({ message: "No articles found in this category" });
    }
    return response.status(200).json(articles);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Internal server error" });
  }
}



// http://localhost:3000/article/date  --------->get
/*Data: { "date": "2023-10-01" }
*/
export const seeArticlesByDate = async (request, response) => {
  try {
    const { date } = request.body;
    const articles = await Article.find({ date: date }).populate("author", "name email");

    if (articles.length === 0) {
      return response.status(404).json({ message: "No articles found with this date" });
    }
    return response.status(200).json(articles);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Internal server error" });
  }
}

// http://localhost:3000/article/--------->get
export const seeArticlesByKeyword = async (request, response) => {
  try {
    const { keyword } = request.body;
    const articles = await Article.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { content: { $regex: keyword, $options: "i" } }
      ]
    }).populate("author", "name email");

    if (articles.length === 0) {
      return response.status(404).json({ message: "No articles found with this keyword" });
    }
    return response.status(200).json(articles);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Internal server error" });
  }
}

// http://localhost:3000/article/author/:authorId/category --------->get
export const seeArticlesByAuthorAndCategory = async (request, response) => {
  try {
    const { authorId, category } = request.params;
    const articles = await Article.find({ author: authorId, category: category }).populate("author", "name email");

    if (articles.length === 0) {
      return response.status(404).json({ message: "No articles found for this author in this category" });
    }
    return response.status(200).json(articles);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Internal server error" });
  }
}

// http://localhost:3000/article/search --------->get
export const getAllArticlesByTitle = async (request, response) => {
  try {
    const { title } = request.query;
    const articles = await Article.find({
      title: { $regex: title, $options: "i" }
    }).populate("author", "name email");

    if (articles.length === 0) {
      return response.status(404).json({ message: "No articles found with this title" });
    }
    return response.status(200).json(articles);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Internal server error" });
  }
}


