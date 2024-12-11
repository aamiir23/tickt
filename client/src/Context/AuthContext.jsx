import React, { createContext, useContext, useState } from "react";
// Create a context for authentication
const AuthContext = createContext();

// Custom hook to use the authentication context
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap the application and provide authentication state
export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [user_id, setUser_id] = useState(localStorage.getItem("user_id"));
  const [admin, setAdmin] = useState(localStorage.getItem("admin"))

  const login = (user_id, username) => {
    adminlogout()
    localStorage.setItem("username", username);
    localStorage.setItem("user_id", user_id);
    setUsername(username);
    setUser_id(user_id)
  };
  const adminauth = (admin) => {
    logout()
    localStorage.setItem("admin", admin);
    setAdmin(admin);
  };
  const adminlogout = (admin) => {
    localStorage.removeItem("admin");
    setAdmin(null);
  };
  
  const logout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    console.log("logout")
    
    setUser_id(null)
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ user_id, username, admin, login, logout, adminauth, adminlogout }}>
      {children}
    </AuthContext.Provider>
  );
};
