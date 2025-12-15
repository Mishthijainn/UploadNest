import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
  expiresAt: number | null;
  user: User | null;
}

interface User {
  id: number;
  name: string;
  email: string;
  profilePicture: string;
}

const initialState: AuthState = {
  accessToken: null,
  expiresAt: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.expiresAt = action.payload.expiresAt;
      state.user = action.payload.user;
    },
    updateCredentials: (state, action) => {
      const { accessToken, expiresAt, user } = action.payload;

      if (accessToken !== undefined) state.accessToken = accessToken;
      if (expiresAt !== undefined) state.expiresAt = expiresAt;
      if (user !== undefined) state.user = { ...state.user, ...user };
    },
    logout: (state) => {
      state.accessToken = null;
      state.expiresAt = null;
      state.user = null;
    },
  },
});

export const { setCredentials, updateCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
