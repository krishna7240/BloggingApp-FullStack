import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get("/posts").then((res) => setPosts(res.data));
  }, []);

  return (
    <div>
      <h2>All Blog Posts</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          </h3>
          <p>{post.description}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default PostList;
