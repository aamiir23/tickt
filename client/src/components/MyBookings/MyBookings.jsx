import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import './MyBookings.scss';
import Login from '../Login/Login';

const MyBookings = () => {
  const { user_id, username } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/bookings/${user_id}`);
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    if (user_id) {
      fetchBookings();
    }
  }, [user_id]);

  return username ? (
    <div className="MyBookings">
      <h2>My Bookings</h2>
      <div className="result">

      <table>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Flight ID</th>
            <th>Seats Booked</th>
            <th>Booking DateTime</th>
            <th>Departure City</th>
            <th>Arrival City</th>
            <th>Departure DateTime</th>
            <th>Arrival DateTime</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.booking_id}>
              <td>{booking.booking_id}</td>
              <td>{booking.flight.flight_id}</td>
              <td>{booking.qty}</td>
              <td>{new Date(booking.booking_datetime).toLocaleString()}</td>
              <td>{booking.flight.departure_city}</td>
              <td>{booking.flight.arrival_city}</td>
              <td>{new Date(booking.flight.departure_datetime).toLocaleString()}</td>
              <td>{new Date(booking.flight.arrival_datetime).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
          </div>
  ) : (
    <Login />
  );
};

export default MyBookings;
