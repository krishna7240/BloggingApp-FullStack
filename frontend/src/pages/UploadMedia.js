import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/UploadMedia.css";

function UploadMedia() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const navigate = useNavigate();

  const handleUpload = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }

    if (!file) {
      alert("Please select image or video");
      return;
    }

    if (!title.trim()) {
      alert("Please enter title");
      return;
    }

    try {
      // STEP 1 — Upload file
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await axios.post(
        "http://localhost:8080/api/media/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const mediaUrl = uploadRes.data;

      // STEP 2 — Save post
      await axios.post("http://localhost:8080/api/posts", {
        title: title,
        content: caption,
        mediaUrl: mediaUrl,
        user: { id: user.id },
      });

      alert("Media Post Uploaded Successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.log("Upload Error:", err);
      alert("Upload failed");
    }
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <h2>Upload Media Post</h2>

        {/* TITLE */}
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* FILE */}
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        {/* CAPTION */}
        <textarea
          placeholder="Write caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
}

export default UploadMedia;
