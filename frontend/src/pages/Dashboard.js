import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [commentText, setCommentText] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    loadPosts();
  }, [navigate]);

  const loadPosts = async () => {
    const res = await axios.get("http://localhost:8080/api/posts");
    setPosts(res.data);

    const commentMap = {};
    for (let post of res.data) {
      const c = await axios.get(
        `http://localhost:8080/api/comments/post/${post.id}`
      );
      commentMap[post.id] = c.data;
    }
    setComments(commentMap);
  };

  const addComment = async (postId) => {
    if (!commentText[postId]) return;

    await axios.post("http://localhost:8080/api/comments", {
      content: commentText[postId],
      post: { id: postId },
      user: { id: user.id },
    });

    setCommentText({ ...commentText, [postId]: "" });
    loadPosts();
  };

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("user");
      navigate("/");
    }
  };


  return (
    <div>
      {/* NAVBAR */}
      <div className="nav">
        <h2>Blog Dashboard</h2>
        <div>
          <button onClick={() => navigate("/create-post")}>Create Post</button>
          <button onClick={() => navigate("/upload-media")}>
            Upload Media
          </button>
          <button onClick={() => navigate("/my-posts")}>My Posts</button>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      {/* POSTS */}
      <div className="post-container">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h4 className="post-author">
              {post.user.fname} {post.user.lname}
            </h4>

            <h2 className="post-title">{post.title}</h2>

            {post.mediaUrl &&
              (post.mediaUrl.endsWith(".mp4") ? (
                <video
                  className="post-media"
                  controls
                  src={`http://localhost:8080/${post.mediaUrl}`}
                />
              ) : (
                <img
                  className="post-media"
                  src={`http://localhost:8080/${post.mediaUrl}`}
                  alt=""
                />
              ))}

            <p className="post-content">{post.content}</p>

            {/* COMMENTS */}
            <div className="comment-section">
              {comments[post.id]?.map((c) => (
                <div key={c.id} className="comment-line">
                  <b>{c.user.fname}: </b>
                  {c.content}
                </div>
              ))}

              <div className="comment-input-row">
                <input
                  placeholder="Write a comment..."
                  value={commentText[post.id] || ""}
                  onChange={(e) =>
                    setCommentText({
                      ...commentText,
                      [post.id]: e.target.value,
                    })
                  }
                />
                <button onClick={() => addComment(post.id)}>Post</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
