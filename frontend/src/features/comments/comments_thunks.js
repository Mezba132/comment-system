import { createAsyncThunk } from "@reduxjs/toolkit";
import commentsApi from "../../api/comment_api";

export const fetchComments = createAsyncThunk(
  "comments/fetch",
  async ({ page, limit, sort }, { rejectWithValue }) => {
    try {
      const res = await commentsApi.list({ page, limit, sort });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Fetch failed");
    }
  }
);

export const createComment = createAsyncThunk(
  "comments/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await commentsApi.create(payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Create failed");
    }
  }
);

export const updateComment = createAsyncThunk(
  "comments/update",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      console.log("Thunk updating comment with:", id, payload);
      const res = await commentsApi.update(id, payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Update failed");
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comments/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await commentsApi.remove(id);
      return { id };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  }
);

export const likeComment = createAsyncThunk(
  "comments/like",
  async (id, { rejectWithValue }) => {
    try {
      const res = await commentsApi.like(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Like failed");
    }
  }
);

export const dislikeComment = createAsyncThunk(
  "comments/dislike",
  async (id, { rejectWithValue }) => {
    try {
      const res = await commentsApi.dislike(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Dislike failed");
    }
  }
);

export const replyToComment = createAsyncThunk(
  "comments/reply",
  async ({ parentId, text }, { rejectWithValue }) => {
    try {
      const res = await commentsApi.reply(parentId, { text });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Reply failed");
    }
  }
);
