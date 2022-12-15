import express from 'express';

import { UserController } from '../../models/index.js';
import { verifyToken } from '../../middleware/index.js';

const Router = express.Router();

// READ 
Router.get('/:id', verifyToken, UserController.getUser);
Router.get('/:id/friends', verifyToken, UserController.getUserFriends);

// UPDATE 
Router.patch('/:id/:friendId', verifyToken, UserController.addRemoveFriend)


export default Router;