export const getUserData = (state) => state.auth.user;

export const setName = (state) => state.auth.user.name;

export const avatarURL = (state) => state.auth.user.avatarURL;

export const gitHubURL = (state) => state.auth.user.gitHub;

export const setToken = (state) => state.token;

export const isLogin = (state) => state.auth.isLoggedIn;

export const isRefreshing = (state) => state.auth.isRefreshing;

export const getError = (state) => state.auth.error;

export const getUserEmail = (state) => state.auth.user.email;
