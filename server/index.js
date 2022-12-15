import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

import { register, PostController } from './models/index.js';
import { verifyToken } from './middleware/index.js';

import User from './models/User/user.model.js';
import Post from './models/Post/post.model.js';
import { users, posts } from './data/index.js'

import {
  AuthRoutes,
  UserRoutes
} from './routes/index.js';

import path from 'path';
import { fileURLToPath } from 'url';

/* CONGIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage })

// ROUTES WITH FILES 
app.post('/auth/register', upload.single('picture'), register);
app.post('/posts', verifyToken, upload.single('picture'), PostController.createPost);

// ROUTES 
app.use('/auth', AuthRoutes);
app.use('/users', UserRoutes);


/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server Port: ${PORT}`))

    /*
      ADD DATA TO DB 
      User.insertMany(users);
      Post.insertMany(posts)
    */

  })
  .catch(error =>
    console.log(`${error}: did not connect`))