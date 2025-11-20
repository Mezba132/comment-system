import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  replyToComment,
  fetchComments,
} from "../../features/comments/comments_thunks";
import { toast } from "react-toastify";

export default function ReplyBox({ parentId, onClose }) {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const [text, setText] = useState("");

  const handleReply = (e) => {
    e.preventDefault();

    if (!user) return toast.error("You must be logged in!");

    if (!text.trim()) return toast.warn("Write something");

    dispatch(replyToComment({ text, parentId }))
      .unwrap()
      .then(() => {
        dispatch(fetchComments({ page: 1, limit: 10, sort: "newest" }));
      });
    setText("");
    onClose();
  };

  return (
    <div className="reply-box">
      <textarea
        className="reply-text"
        placeholder="Write a reply..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      <div className="reply-actions">
        <button onClick={handleReply} className="btn btn-primary">
          Reply
        </button>
        <button onClick={onClose} className="btn btn-secondary">
          Cancel
        </button>
      </div>
    </div>
  );
}
