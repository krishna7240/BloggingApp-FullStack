import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreatePost from "./pages/CreatePost";
import UploadMedia from "./pages/UploadMedia";
import MyPosts from "./pages/MyPosts";
import EditPost from "./pages/EditPost";
import AllPosts from "./pages/AllPosts";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/upload-media" element={<UploadMedia />} />
        <Route path="/my-posts" element={<MyPosts />} />
        <Route path="/all-posts" element={<AllPosts />} />
        <Route path="/edit-post/:id" element={<EditPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
