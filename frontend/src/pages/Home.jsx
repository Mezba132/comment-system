import AddComment from "../components/comments/AddComment";
import CommentList from "../components/comments/CommentList";

export default function CommentsPage() {
  return (
    <div className="container">
      <h1 className="page-title">Comment System</h1>
      <AddComment />
      <CommentList />
    </div>
  );
}
