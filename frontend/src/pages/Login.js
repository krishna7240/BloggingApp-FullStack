import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await API.post("/users/login", { email, pwd });

      // success only if status 200
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid Email or Password");
    }
  };


  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome </h2>
        <p>Please login to continue</p>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPwd(e.target.value)}
        />

        <button onClick={login}>Login</button>

        <p className="register-link">
          New user? <span onClick={() => navigate("/register")}>Register</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
