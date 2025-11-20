import { useDispatch } from "react-redux";
import { fetchComments } from "../../features/comments/comments_thunks";

export default function Pagination({ page, limit, total }) {
  const dispatch = useDispatch();
  const pages = Math.ceil(total / limit) || 1;

  const goto = (p) => dispatch(fetchComments({ page: p, limit }));

  return (
    <div className="pagination">
      <button onClick={() => goto(Math.max(1, page - 1))} disabled={page === 1}>
        Prev
      </button>
      <span>
        {page} / {pages}
      </span>
      <button
        onClick={() => goto(Math.min(pages, page + 1))}
        disabled={page === pages}
      >
        Next
      </button>
    </div>
  );
}
