import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { HiEye } from "react-icons/hi2";
import type { User } from "../types/user";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/dashboard" />;
  }

  const handleRegister = () => {

  if (!username || password.length < 4) {
    alert("Enter valid details");
    return;
  }

  // confirm password check
  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  const existingUsers = JSON.parse(
    localStorage.getItem("users") || "[]"
  );

  // username already exists check
  const userExists = existingUsers.find(
  (user: User) =>
    user.username === username
);

  if (userExists) {
    alert("Username already exists");
    return;
  }

  const newUser = {
    username,
    password,
  };

  existingUsers.push(newUser);

  localStorage.setItem(
    "users",
    JSON.stringify(existingUsers)
  );

  alert("Registered successfully");

  navigate("/login");
    };

  return (
    <div>
      <h1 className="title">E-Commerce Site</h1>

      <div className="register-container">
    
        <div className="register-card">

          <h2 className="login-title">Register</h2>

          <input
            className="login-input"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />

          <div className="password-container">

            <input
              className="login-input"
              type={showPass ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              className="eye-icon"
              onClick={() => setShowPass(!showPass)}
            >
              <HiEye />
            </span>

          </div>

          <div className="password-container">

            <input
              className="login-input"
              type={showPass ? "text" : "password"}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <span
              className="eye-icon"
              onClick={() => setShowPass(!showPass)}
            >
              <HiEye />
            </span>

          </div>

          <br />

          <button
            className="login-button" 
            onClick={handleRegister}>Register
          </button>

          <br />

          <button
            className="NewUser-button"
            onClick={() => navigate("/login")}>
              Existing User? 
            </button>

        </div>
      </div>
    </div>
  );
}