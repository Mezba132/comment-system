import { useState } from "react";
import ReplyBox from "./ReplyBox";
import { useDispatch, useSelector } from "react-redux";
import {
  likeComment,
  dislikeComment,
  deleteComment,
  fetchComments,
} from "../../features/comments/comments_thunks";
import { toast } from "react-toastify";
import EditComment from "./EditComment";
import { updateComment } from "../../features/comments/comments_thunks";

export default function CommentItem({ comment }) {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);

  const [editOpen, setEditOpen] = useState(false);
  const [editText, setEditText] = useState(comment.text);
  const [replyOpen, setReplyOpen] = useState(false);

  const handleLike = () => {
    if (!user) return toast.error("Login required");
    dispatch(likeComment(comment._id))
      .unwrap()
      .then(() => {
        dispatch(fetchComments({ page: 1, limit: 10, sort: "newest" }));
      });
  };

  const handleDislike = () => {
    if (!user) return toast.error("Login required");
    dispatch(dislikeComment(comment._id))
      .unwrap()
      .then(() => {
        dispatch(fetchComments({ page: 1, limit: 10, sort: "newest" }));
      });
  };

  const handleDelete = () => {
    if (!user) return toast.error("Login required");
    if (user._id !== comment.author._id)
      return toast.error("You can delete only your own comments");

    dispatch(deleteComment(comment._id))
      .unwrap()
      .then(() => {
        dispatch(fetchComments({ page: 1, limit: 10, sort: "newest" }));
      });
  };

  const handleSaveEdit = () => {
    if (!editText.trim()) return toast.error("Comment cannot be empty");
    dispatch(updateComment({ id: comment._id, payload: { text: editText } }))
      .unwrap()
      .then(() => {
        setEditOpen(false);
        dispatch(fetchComments({ page: 1, limit: 10, sort: "newest" }));
      });
  };

  return (
    <div className="comment-item">
      <div className="comment-header">
        <div className="comment-author">
          <div className="avatar">
            {comment.author?.name?.[0]?.toUpperCase()}
          </div>

          <div>
            <div className="author-name">{comment.author?.name}</div>
            <div className="comment-date">
              {new Date(comment.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      <div className="comment-text">{comment.text}</div>

      <div className="comment-actions">
        <button className="action-btn" onClick={handleLike}>
          👍 {comment.likesCount}
        </button>

        <button className="action-btn" onClick={handleDislike}>
          👎 {comment.dislikesCount}
        </button>

        <button className="reply-btn" onClick={() => setReplyOpen(!replyOpen)}>
          💬 Reply
        </button>

        {user?._id === comment.author?._id && (
          <>
            <button className="edit-btn" onClick={() => setEditOpen(true)}>
              ✏️ Edit
            </button>
            <button className="delete-btn" onClick={handleDelete}>
              🗑 Delete
            </button>
          </>
        )}
      </div>

      {replyOpen && (
        <ReplyBox parentId={comment._id} onClose={() => setReplyOpen(false)} />
      )}

      {comment.replies?.length > 0 && (
        <div className="replies-wrapper">
          {comment.replies.map((rep) => (
            <div key={rep._id} className="reply-item">
              <div className="reply-author">
                <div className="avatar avatar-sm">
                  {rep.author?.name?.[0]?.toUpperCase()}
                </div>
                <div className="reply-author-meta">
                  <div className="author-name">{rep.author?.name}</div>
                </div>
                <div className="reply-date">
                  {new Date(rep.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="reply-text">{rep.text}</div>
            </div>
          ))}
        </div>
      )}

      <EditComment
        isOpen={editOpen}
        value={editText}
        onChange={setEditText}
        onClose={() => setEditOpen(false)}
        onSave={handleSaveEdit}
      />
    </div>
  );
}
