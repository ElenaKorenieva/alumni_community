import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:2000";

const setAuthHeader = (thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.token;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const createPost = createAsyncThunk(
  "posts/",
  async (formData, thunkAPI) => {
    try {
      setAuthHeader(thunkAPI);
      const response = await axios.post("/posts", formData);
      console.log(response);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const likePost = createAsyncThunk(
  "posts/likePost",
  async (post, thunkAPI) => {
    try {
      setAuthHeader(thunkAPI);
      const response = await axios.put(`/posts/${post._id}/like`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const deletePost = createAsyncThunk("posts/", async (id, thunkAPI) => {
  try {
    setAuthHeader(thunkAPI);
    const response = await axios.delete(`/posts/${id}`);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const editPost = createAsyncThunk("posts/", async (post, thunkAPI) => {
  try {
    const postToSend = {
      title: post.title,
      message: post.message
    }
    setAuthHeader(thunkAPI);
    const response = await axios.put(`/posts/${post._id}`, postToSend);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const sendComment = createAsyncThunk(
  "posts/sendComment",
  async ({ post, commentText }, thunkAPI) => {
    try {
      setAuthHeader(thunkAPI);
      const response = await axios.put(`/posts/${post._id}/comment`, {
        message: commentText,
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "posts/deleteComment",
  async (postAndComment, thunkAPI) => {
    try {
      setAuthHeader(thunkAPI);
      const response = await axios.delete(
        `/posts/${postAndComment.postId}/comment/${postAndComment.commentId}`
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const editComment = createAsyncThunk(
  "posts/editComment",
  async (postAndComment, thunkAPI) => {
    try {
      setAuthHeader(thunkAPI);
      const response = await axios.put(`/posts/${postAndComment.postId}/comment/${postAndComment.commentId}`, { message: postAndComment.message });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const findPostsByTopic = createAsyncThunk(
  "posts/",
  async (topic, thunkAPI) => {
    try {
      setAuthHeader(thunkAPI);
      const response = await axios.get(`/posts?topic=${topic.topic}`);
      console.log(response);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const findPostsByUser = createAsyncThunk(
  "posts/userPosts",
  async (user, thunkAPI) => {
    try {
      setAuthHeader(thunkAPI);
      const response = await axios.get(`/posts?user=${user.user}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const findFeed = createAsyncThunk(
  "posts/feed",
  async (_, thunkAPI) => {

    try {
      setAuthHeader(thunkAPI);
      const response = await axios.get(`/posts?order=DESC&limit=10`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);
