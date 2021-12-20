import { comments } from "../../../data/comments";

export default function handler(req, res) {
  if (req.method === "GET") {
    const { commentId } = req.query;
    const comment = comments.find((c) => c.id === parseInt(commentId));
    res.status(200).json(comment);
  } else if (req.method === "DELETE") {
    const { commentId } = req.query;
    const deletedComment = comments.find((c) => c.id === parseInt(commentId));
    const index = comments.indexOf(deletedComment);
    comments.splice(index, 1);
    res.status(200).json(deletedComment);
  }
}
