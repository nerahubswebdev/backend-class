import Post from "../models/post.model.js";

const newPost = async (req, res) => {
  try {
    const { category, title, content, image } = req.body;

    const userdetails = req.user;

    if (!category || !title || !content || !image) {
      res.status(400).json({
        success: false,
        message: "All required fields needed",
      });
      return;
    }

    const post = await Post.create({
      author_name: userdetails?.name,
      author_id: userdetails?._id,
      author_image: userdetails?.image,
      category,
      title,
      content,
      image,
    });

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
