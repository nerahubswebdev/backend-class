import Post from "../models/post.model.js";

const newPost = async (req, res) => {
  try {
    const { author_name, category, title, content, image } = req.body;

    if (!author_name || !category || !title || !content || !image) {
      res.status(400).json({
        success: false,
        message: "All required fields needed",
      });
      return;
    }

    const post = await Post.create(req.body);

    if (post) {
      res.status(201).json({
        success: true,
        message: "Post Added",
        post,
      });
      return;
    } else {
      res.status(400).json({
        success: true,
        message: "Post not added",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { newPost };
