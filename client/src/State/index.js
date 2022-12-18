import { createSlice } from '@reduxjs/toolkit';

// INITIAL APPLICATION STATE 
const initialState = {
  mode: 'light',
  user: null,
  token: null,
  posts: [],
};

// CREATE REDUCERS 
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // REDUCER FUNCTIONS
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state, action) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends
      } else {
        console.error('User friends non-existent')
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post_id) return action.payload.post;

        return post
      });

      state.posts = updatedPosts
    }
  }
});

export const { setMode, setFriends, setLogin, setLogout, setPost, setPosts } =
  authSlice.actions;

export default authSlice.reducer;