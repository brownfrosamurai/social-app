import mongoose from 'mongoose';

const PostSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  location: String,
  description: String,
  picturePath: String,
  occupation: String,
  likes: {
    type: Map,
    of: Boolean
  },
  comments: {
    type: Array,
    default: []
  }
},
  { timestamps: true }
);

const Post = mongoose.model('posts', PostSchema)

export default Post
