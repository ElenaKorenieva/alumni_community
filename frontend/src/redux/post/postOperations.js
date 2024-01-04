import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:2000";

const setAuthHeader = (token) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

export const createPost = createAsyncThunk(
    "posts/",
    async (credentials, thunkAPI) => {
      try {
        const response = await axios.post("/posts", credentials);
        setAuthHeader(response.data.token);
        console.log(response);
        return response.data;
      } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.message);
      }
    }
);