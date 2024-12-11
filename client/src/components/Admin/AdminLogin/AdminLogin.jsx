import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useAuth } from "../../../Context/AuthContext"; // Import the useAuth hook
import "./AdminLogin.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { admin, adminauth } = useAuth(); // Get the login function from the authentication context

  const handleLogin = async () => {
    // try {
      const response = await axios.post("https://tickt-server.onrender.com/api/v1/admin/login/", {
        email,
        password,
      });
      // Handle successful login response
      console.log("Login successful:", response.data);
      const { username } = response.data;
      console.log(username);
      adminauth(username); // Set the username using the login function from the authentication context
      navigate('/admin/flight'); // Navigate to the desired route after login
    // } catch (error) {
    //   // Handle login error
    //   console.error("Login error:", error.response.data);
    // }
  };

  return (
    <div className="Admin-Login">
      <h2>Login To Tickt-Admin:</h2>
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
