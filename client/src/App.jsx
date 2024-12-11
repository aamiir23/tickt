import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import FlightSearch from "./components/FlightSearch/FlightSearch";
import Booking from "./components/Booking/Booking";
import MyBookings from "./components/MyBookings/MyBookings";
import AdminLogin from "./components/Admin/AdminLogin/AdminLogin";
import Flight from "./components/Admin/Flight/Flight";
import Bookings from "./components/Admin/Bookings/Bookings";
import Landing from "./Landing";
import "./App.scss";
import { AuthProvider } from "./Context/AuthContext";

const App = () => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      setUsername(null);
    }
  }, [localStorage.getItem("username")]);

  return (
    <Router>
      <AuthProvider>

      <div>
        <Navbar />
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

              <Route path="/search" element={<FlightSearch />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/mybookings" element={<MyBookings />} />


          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/flight" element={<Flight />} />
          <Route path="/admin/bookings" element={<Bookings />} />
        </Routes>
      </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
