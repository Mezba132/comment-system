import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../../features/comments/comments_thunks";
import CommentItem from "./CommentItem";
import Pagination from "./Pagination";
import SortSelect from "../common/SortSelect";

export default function CommentList() {
  const dispatch = useDispatch();
  const { items, page, limit, total, loading, sort } = useSelector(
    (s) => s.comments
  );

  useEffect(() => {
    dispatch(fetchComments({ page, limit, sort }));
  }, [dispatch, page, limit, sort]);

  if (loading) return <div>Loading comments...</div>;

  return (
    <div className="comment-list-wrapper">
      <div className="controls">
        <SortSelect />
      </div>

      {items.length === 0 && !loading && (
        <div className="empty-comments">
          <p>No comments found</p>
        </div>
      )}

      {items.map((c) => (
        <CommentItem key={c.id} comment={c} />
      ))}

      <Pagination page={page} limit={limit} total={total} />
    </div>
  );
}
