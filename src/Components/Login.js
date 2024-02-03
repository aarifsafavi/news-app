import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const validId = "aarif";
    const validPassword = "test@1234";

    if (id === validId && password === validPassword) {
      navigate("/home");
    } else {
      alert("Invalid ID or Name. Please try again.");
    }
  };

  return (
    <div className="cont-login">
      <div className="cont-box">
        <div className="login">Login</div>
        <div className="cont-input">
          <input
            className="login-input"
            type="text"
            placeholder="Id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="button-login" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
