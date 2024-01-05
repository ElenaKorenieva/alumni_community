import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:2000";

const setAuthHeader = (thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.token
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const createPost = createAsyncThunk(
  "posts/",
  async (credentials, thunkAPI) => {
    try {
      setAuthHeader(thunkAPI);
      const response = await axios.post("/posts", credentials);
      console.log(response);
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
