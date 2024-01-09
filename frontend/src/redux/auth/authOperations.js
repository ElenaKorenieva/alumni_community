import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:2000";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/users/register", credentials);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/users/login", credentials);
      setAuthHeader(response.data.token);
      console.log(response);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

// export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
//   try {
//     await axios.post("/users/logout");
//     clearAuthHeader();
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.message);
//   }
// });

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().auth.token}`,
      },
    };
    await axios.post("/users/logout", null, config);
    clearAuthHeader();
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (formData, thunkAPI) => {
    try {
      const { data } = await axios.patch("/users/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const getImageFromGitHub = createAsyncThunk(
  "users/getImageFromGitHub",
  async (gitHubURL, thunkAPI) => {
    if (gitHubURL !== "none" || gitHubURL !== "") {
      const gitHubName = gitHubURL.split("/");
      const userName = gitHubName[3];

      const client_id = process.env.REACT_APP_CLIENT_ID;
      const client_secret = process.env.REACT_APP_CLIENT_SECRET;

      // try {
      //   const response = await axios.get(
      //     `http://api.github.com/users/${userName}?client_id=${client_id}&client_secret=${client_secret}&sort=created`
      //   );
      //   const { data } = response;
      //   return data.avatar_url;
      // } catch (e) {
      //   return thunkAPI.rejectWithValue(e.message);
      // }

      try {
        const response = await axios.get(
          `https://api.github.com/users/${userName}`,
          {
            params: {
              client_id,
              client_secret,
              sort: "created",
            },
            // Ensure there is no Authorization header
            headers: {
              Authorization: undefined,
            },
          }
        );

        const { data } = response;
        return data.avatar_url;
      } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  }
);
