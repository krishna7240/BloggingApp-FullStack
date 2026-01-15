import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/CreatePost.css";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleCreate = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/posts", {
        title,
        content,
        user: { id: user.id },
      });

      alert("Post Created Successfully!");
      navigate("/dashboard");
    } catch (err) {
      alert("Failed to create post");
    }
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <h2>Create New Post</h2>

        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write your content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button onClick={handleCreate}>Publish</button>
      </div>
    </div>
  );
}

export default CreatePost;
