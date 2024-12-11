import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext"; // Import the useAuth hook
import "./Navbar.scss";

const Navbar = () => {
  const { username, logout, admin, adminlogout } = useAuth(); // Get the username and logout function from the authentication context

  return (
    <nav>
      <img src="favicon.svg" alt="" />
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {username ? (
        //   <>
        //     <li>
        //       <span>Welcome, {username}!</span>
        //     </li>
        <>
        <li>
          <Link to="/search">Search Flights</Link>
        </li>
        <li>
          <Link to="/booking">Book Tickets</Link>
        </li>
        <li>
          <Link to="/mybookings">My Bookings</Link>
        </li>
            <li>
              <Link onClick={logout}>Logout</Link> {/* Use logout function for logout */}
            </li>
           </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}
        {
          admin?
          <>
          <li>
          <Link to="/admin/bookings">Bookings</Link>
        </li><li>
          <Link to="/admin/flight">Flights</Link>
        </li>
          <li>
          <Link onClick={adminlogout}>Admin Logout</Link>
        </li>
          </>
        :<></>
        }
      </ul>
    </nav>
  );
};

export default Navbar;
