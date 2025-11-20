import { createSlice } from "@reduxjs/toolkit";
import {
  fetchComments,
  createComment,
  updateComment,
  deleteComment,
  likeComment,
  dislikeComment,
} from "./comments_thunks";

const initialState = {
  items: [],
  total: 0,
  page: 1,
  limit: 5,
  sort: "like",
  loading: false,
  error: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (s, action) => {
        s.loading = true;
        s.error = null;
        const args = action?.meta?.arg ?? {};
        s.sort = args.sort ?? s.sort;
        s.page = args.page ?? s.page;
        s.limit = args.limit ?? s.limit;
      })
      .addCase(fetchComments.fulfilled, (s, action) => {
        s.loading = false;
        const payload = action.payload ?? {};
        s.items = payload.comments ?? [];
        if (payload.pagination) {
          s.total = payload.pagination.total ?? 0;
          s.page = payload.pagination.page ?? s.page;
          s.limit = payload.pagination.limit ?? s.limit;
        } else {
          s.total = s.items.length;
        }
      })
      .addCase(fetchComments.rejected, (s, action) => {
        s.loading = false;
        s.error = action.payload;
      })
      .addCase(createComment.fulfilled, (s, action) => {
        s.items.unshift(action.payload);
        s.total += 1;
      })
      .addCase(updateComment.fulfilled, (s, action) => {
        const idx = s.items.findIndex((c) => c.id === action.payload.id);
        if (idx !== -1) s.items[idx] = action.payload;
      })
      .addCase(deleteComment.fulfilled, (s, action) => {
        s.items = s.items.filter((c) => c.id !== action.payload.id);
        s.total -= 1;
      })
      .addCase(likeComment.fulfilled, (s, action) => {
        const idx = s.items.findIndex((c) => c.id === action.payload.id);
        if (idx !== -1) s.items[idx] = action.payload;
      })
      .addCase(dislikeComment.fulfilled, (s, action) => {
        const idx = s.items.findIndex((c) => c.id === action.payload.id);
        if (idx !== -1) s.items[idx] = action.payload;
      });
  },
});

export default commentsSlice.reducer;
