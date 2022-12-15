import express from 'express';
import { PostController } from '../../models/index.js';
import { verifyToken } from '../../middleware/index.js';

const Router = express.Router();

// READ 
Router.get('/', verifyToken, PostController.getFeedPosts)
Router.get('/:userId/posts', verifyToken, PostController.getUserPosts)

// UPDATE 
Router.patch('/:id/like', verifyToken, PostController.likePost)
export default Router;