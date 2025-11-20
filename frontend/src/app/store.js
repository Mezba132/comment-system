import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth_slice";
import commentsReducer from "../features/comments/comments_slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    comments: commentsReducer,
  },
});
