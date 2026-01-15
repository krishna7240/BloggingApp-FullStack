import React, { useEffect, useState } from "react";
import API from "../services/api";
import "../css/AllPosts.css";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const res = await API.get("/posts");
    setPosts(res.data);
  };

  return (
    <div className="allposts-container">
      <h2>All Blogs</h2>

      {posts.map((post) => (
        <div key={post.id} className="allpost-card">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <small>Author: {post.user.name}</small>
        </div>
      ))}
    </div>
  );
}

export default AllPosts;
