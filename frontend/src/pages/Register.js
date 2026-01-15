import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "../css/Register.css";

function Register() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    try {
      await API.post("/users/register", {
        fname,
        lname,
        email,
        pwd,
      });

      alert("Registration Successful! Please Login.");
      navigate("/login");
    } catch (error) {
      alert("Registration Failed");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create Account </h2>
        <p>Register to start posting blogs</p>

        <input
          placeholder="First Name"
          onChange={(e) => setFname(e.target.value)}
        />

        <input
          placeholder="Last Name"
          onChange={(e) => setLname(e.target.value)}
        />

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

        <button onClick={register}>Register</button>

        <p className="login-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default Register;
