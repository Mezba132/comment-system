import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../features/comments/comments_thunks";
import { toast } from "react-toastify";

export default function AddComment({ parentId = null }) {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to comment");
      return;
    }

    if (!text.trim()) {
      toast.warning("Please write a comment");
      return;
    }

    try {
      setIsSubmitting(true);
      dispatch(createComment({ text: text.trim(), parentId }));
      setText("");
      toast.success("Comment posted successfully!");
    } catch (err) {
      toast.error("Failed to post comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-comment-form">
      <div className="add-comment-container">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="add-comment-textarea"
          disabled={isSubmitting}
        />
        <div className="add-comment-actions">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={isSubmitting || !text.trim()}
          >
            {isSubmitting ? "Posting..." : "Post Comment"}
          </button>
          <span className="char-count">{text.length} / 500</span>
        </div>
      </div>
    </form>
  );
}
