import axiosClient from "./axios_client";

const commentsApi = {
  create: (payload) => axiosClient.post("/comment", payload),
  list: ({ page = 1, limit = 10, sort = "dislikes" }) =>
    axiosClient.get("/comments", { params: { page, limit, sort } }),
  update: (id, payload) => axiosClient.put(`/comment/${id}`, payload),
  remove: (id) => axiosClient.delete(`/comment/${id}`),
  like: (id) => axiosClient.put(`/comment/${id}/like`),
  dislike: (id) => axiosClient.put(`/comment/${id}/dislike`),
  reply: (id, payload) => axiosClient.post(`/comment/${id}/reply`, payload),
};

export default commentsApi;
