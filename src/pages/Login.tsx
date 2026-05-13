import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { HiEye } from "react-icons/hi2";
import type { User } from "../types/user";


export default function Login() {

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/dashboard" />;
  }

  const handleLogin = async () => {

  // check registered local user first
  const users = JSON.parse(
  localStorage.getItem("users") || "[]"
  );

  const matchedUser = users.find(
  (user: User) =>
    user.username === username &&
    user.password === password
);


  if (matchedUser) {

    localStorage.setItem("token", "fake-token");

    navigate("/dashboard");

    return;
  }

  // if not local user, then check API
  try {

    const res = await loginUser(username, password);

    localStorage.setItem("token", res.data.token);

    navigate("/dashboard");

  } catch (err) {

    alert("Invalid credentials");   
    }
  };

  return (
    <div> 
      <h1 className="title">E-Commerce Site</h1>

      <div className="login-container">
        
        <div className="login-card">

          <h2 className="login-title">Login</h2>

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

          <br />

          <button
            className="login-button"
            onClick={handleLogin}>
            Login
          </button>

          <br />

          <button
            className="NewUser-button" 
            onClick={() => navigate("/register")}>
            New User?
          </button>
          <br />
        </div>
      </div>
    </div>
  );
}

//test ID and Pass
// Username: mor_2314
// Password: 83r5^_