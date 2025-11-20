import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../../features/comments/comments_thunks";

export default function SortSelect() {
  const dispatch = useDispatch();
  const { sort, limit } = useSelector((s) => s.comments);

  const onChange = (e) => {
    const newSort = e.target.value;
    dispatch(fetchComments({ page: 1, limit, sort: newSort }));
  };

  return (
    <select onChange={onChange} value={sort}>
      <option value="newest">Newest</option>
      <option value="most_liked">Most liked</option>
      <option value="most_disliked">Most disliked</option>
    </select>
  );
}
