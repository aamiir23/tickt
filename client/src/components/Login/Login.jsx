import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useAuth } from "../../Context/AuthContext"; // Import the useAuth hook
import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from the authentication context

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/v1/login/", {
        email,
        password,
      });
      // Handle successful login response
      console.log("Login successful:", response.data);
      const { user_id, username } = response.data;
      console.log(username, user_id);
      login(user_id,username); // Set the username using the login function from the authentication context
      navigate('/search'); // Navigate to the desired route after login
    } catch (error) {
      // Handle login error
      console.error("Login error:", error.response.data);
    }
  };

  return (
    <div className="Login">
      <h2>Login To Tickt:</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
