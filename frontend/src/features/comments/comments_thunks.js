import { createAsyncThunk } from "@reduxjs/toolkit";
import commentsApi from "../../api/comment_api";

export const fetchComments = createAsyncThunk(
  "comments/fetch",
  async ({ page, limit, sort }, { rejectWithValue }) => {
    try {
      const res = await commentsApi.list({ page, limit, sort });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.err || "Fetch failed");
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
      return rejectWithValue(err.response?.data?.err || "Create failed");
    }
  }
);

export const updateComment = createAsyncThunk(
  "comments/update",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const res = await commentsApi.update(id, payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.err || "Update failed");
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
      return rejectWithValue(err.response?.data?.err || "Delete failed");
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
      return rejectWithValue(err.response?.data?.err || "Like failed");
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
      return rejectWithValue(err.response?.data?.err || "Dislike failed");
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
      return rejectWithValue(err.response?.data?.err || "Reply failed");
    }
  }
);
