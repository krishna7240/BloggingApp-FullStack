import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/MyPosts.css";

function MyPosts() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [commentText, setCommentText] = useState({});
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    loadMyPosts();
  }, [navigate]);

  // ===== LOAD POSTS + COMMENTS =====
  const loadMyPosts = async () => {
    const res = await axios.get(
      `http://localhost:8080/api/posts/user/${user.id}`
    );
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

  // ===== ADD COMMENT =====
  const addComment = async (postId) => {
    if (!commentText[postId]) return;

    await axios.post("http://localhost:8080/api/comments", {
      content: commentText[postId],
      post: { id: postId },
      user: { id: user.id },
    });

    setCommentText({ ...commentText, [postId]: "" });
    loadMyPosts();
  };

  // ===== DELETE POST =====
  const deletePost = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await axios.delete(`http://localhost:8080/api/posts/${id}`);
      loadMyPosts();
    }
  };

  // ===== START EDIT =====
  const startEdit = (post) => {
    setEditingPost({ ...post });
  };

  // ===== UPDATE POST =====
  const handleUpdate = async () => {
    await axios.put(
      `http://localhost:8080/api/posts/${editingPost.id}`,
      editingPost
    );
    setEditingPost(null);
    loadMyPosts();
  };

  return (
    <div>
      {/* ===== NAVBAR (same as Dashboard) ===== */}
      <div className="nav">
        <h2>My Posts</h2>
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          Back
        </button>
      </div>

      {/* ===== POSTS ===== */}
      <div className="post-container">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            {/* Author */}
            <h4 className="post-author">
              {post.user.fname} {post.user.lname}
            </h4>

            {/* Title */}
            <h2 className="post-title">{post.title}</h2>

            {/* Media */}
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

            {/* Content */}
            <p className="post-content">{post.content}</p>

            {/* ===== COMMENTS ===== */}
            <div className="comment-section">
              {comments[post.id]?.map((c) => (
                <div key={c.id} className="comment-line">
                  <span className="comment-user">{c.user.fname}:</span>
                  <span className="comment-text"> {c.content}</span>
                </div>
              ))}

              <div className="comment-input-row">
                <input
                  placeholder="Write comment..."
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

            {/* ===== ACTION BUTTONS ===== */}
            <div className="action-row">
              <button className="edit-btn" onClick={() => startEdit(post)}>
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => deletePost(post.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ===== EDIT MODAL ===== */}
      {editingPost && (
        <div className="modal">
          <div className="modal-card">
            <h3>Edit Post</h3>

            <input
              value={editingPost.title}
              onChange={(e) =>
                setEditingPost({ ...editingPost, title: e.target.value })
              }
            />

            <textarea
              value={editingPost.content}
              onChange={(e) =>
                setEditingPost({ ...editingPost, content: e.target.value })
              }
            />

            <button className="edit-btn" onClick={handleUpdate}>
              Update
            </button>
            <button className="delete-btn" onClick={() => setEditingPost(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyPosts;
