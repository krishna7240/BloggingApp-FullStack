import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function ViewPost() {
  const { id } = useParams(); // post id from URL
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState({
    name: "",
    email: "",
    content: "",
  });

  // Fetch post + comments
  useEffect(() => {
    API.get(`/posts/${id}`).then((res) => setPost(res.data));
    API.get(`/comments/${id}`).then((res) => setComments(res.data));
  }, [id]);

  // Add comment
  const submitComment = async () => {
    await API.post("/comments", {
      ...comment,
      post: { id: id },
    });
    alert("Comment added");
    setComment({ name: "", email: "", content: "" });

    // reload comments
    const res = await API.get(`/comments/${id}`);
    setComments(res.data);
  };

  if (!post) return <h3>Loading...</h3>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>

      <hr />

      <h3>Comments</h3>
      {comments.length === 0 && <p>No comments yet</p>}

      {comments.map((c) => (
        <div key={c.id}>
          <strong>{c.name}</strong>
          <p>{c.content}</p>
          <hr />
        </div>
      ))}

      <h3>Add Comment</h3>
      <input
        placeholder="Name"
        value={comment.name}
        onChange={(e) => setComment({ ...comment, name: e.target.value })}
      />
      <br />

      <input
        placeholder="Email"
        value={comment.email}
        onChange={(e) => setComment({ ...comment, email: e.target.value })}
      />
      <br />

      <textarea
        placeholder="Comment"
        value={comment.content}
        onChange={(e) => setComment({ ...comment, content: e.target.value })}
      />
      <br />

      <button onClick={submitComment}>Submit</button>
    </div>
  );
}

export default ViewPost;
