import Post from './post.model.js';
import User from '../User/user.model.js';

/**
 * route - POST /posts
 * access - Token
 */
const createPost = async (res, req) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);

    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: []
    });

    await newPost.save();
    const post = await Post.find();

    res.status(201).json(post)

  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

/**
 * route - GET /posts
 * access - Token
 */
const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();

    res.status(200).json(post)

  } catch (error) {
    res.status(404).json({ error: error.message })
  }
};

/**
 * route - GET /posts/:userId/posts
 * access - Token
 */
const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params

    // FETCH POSTS WITH ID 
    const post = await Post.find({ userId });

    res.status(200).json(post);

  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

/**
 * route - PATCH /posts/:id/like
 * access - Token
 */
const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    // FETCH POST AND CHECK IF USER EXIST IN LIKES 
    const post = await Post.findById(id);
    const isliked = post.likes.get(userId)

    if (isliked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    // FETCH UPDATED POSTS 
    const updatedPosts = await Post.findByIdAndUpdate(id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPosts);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};

export const PostController = {
  // POST 
  createPost,
  // READ 
  getFeedPosts,
  getUserPosts,
  // PATCH 
  likePost
};