import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import "../css/CreatePost.css";

function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadPost();
  }, []);

  const loadPost = async () => {
    const res = await API.get(`/posts/${id}`);
    setTitle(res.data.title);
    setContent(res.data.content);
  };

  const updatePost = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    await API.put(`/posts/${id}`, {
      id,
      title,
      content,
      user: { id: user.id },
    });

    alert("Post Updated!");
    navigate("/my-posts");
  };

  return (
    <div className="post-container">
      <div className="post-card">
        <h2>Edit Blog</h2>

        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button onClick={updatePost}>Update</button>
      </div>
    </div>
  );
}

export default EditPost;
