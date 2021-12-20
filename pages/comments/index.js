import React from "react";
import { useState } from "react";

export default function CommentsPage() {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const fetchComments = async () => {
    // fetch comments
    const response = await fetch("/api/comments");
    const data = await response.json();
    setComments(data);
  };

  const submitComment = async () => {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ comment }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
  };

  const deleteComment = async (id) => {
    const response = await fetch(`/api/comments/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    fetchComments();
  };

  return (
    <>
      <button onClick={fetchComments}>Load comments</button>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={submitComment}>Add comment</button>
      <br />
      {comments.map((comment) => (
        <div key={comment.id}>
          <h3>{comment.id}</h3>
          <p>{comment.text}</p>
          <button
            onClick={() => {
              deleteComment(comment.id);
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </>
  );
}
