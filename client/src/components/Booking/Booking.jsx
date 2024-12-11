import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";
import './Booking.scss'
import Login from "../Login/Login";
import {format} from "date-fns"
const Booking = () => {
  const { user_id, username } = useAuth();
  const [flight, setFlight] = useState(null);
  const location = useLocation();
  const [qty, setQty] = useState(1)
  const navigate = useNavigate();
// Fetch flight information based on the flightId
const fetchFlight = async () => {
  const searchParams = new URLSearchParams(location.search);
  const flightId = searchParams.get("flightId");

  try {
      console.log("first fetch");
      const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/flights/${flightId}`
      );
      console.log(response.data);

      // Check if response.data is an array
      if (Array.isArray(response.data)) {
          // Map over the array and format date-time strings
          const formattedFlights = response.data.map(flight => ({
              ...flight,
              departure_datetime: format(new Date(flight.departure_datetime), 'yyyy-MM-dd HH:mm:ss'),
              arrival_datetime: format(new Date(flight.arrival_datetime), 'yyyy-MM-dd HH:mm:ss')
          }));
          setFlight(formattedFlights);
          console.log(flight)
      } else {
          // Format date-time strings if response.data is a single object
          const formattedFlight = {
              ...response.data,
              departure_datetime: format(new Date(response.data.departure_datetime), 'yyyy-MM-dd HH:mm:ss'),
              arrival_datetime: format(new Date(response.data.arrival_datetime), 'yyyy-MM-dd HH:mm:ss')
          };
          setFlight([formattedFlight][0]); // Wrap single object in an array
          console.log(flight[0])
      }
  } catch (error) {
      console.error("Error fetching flight:", error);
  }
};
  useEffect(() => {

    const searchParams = new URLSearchParams(location.search);
    const flightId = searchParams.get("flightId");

    if (flightId) {
      
      fetchFlight();
    }
  }, [location.search]);

  const handleBooking = async () => {
    const bdate = new Date();
    const searchParams = new URLSearchParams(location.search);
    const flightId = searchParams.get("flightId");
    const data = {
      user_id: user_id, // Update to user_id instead of user_id
      flight_id: flightId, // Update to flight_id instead of flightId
      booking_datetime: bdate.toISOString(), // Use ISO string for datetime
      qty
    };
    if (confirm("Are you sure you want to book this flight?")) {
      
      
    try {

      const response = await axios.post("http://127.0.0.1:8000/api/v1/booking/", data);
      console.log("Booked flight", response.data);
      fetchFlight();
      navigate(`/mybookings`);
      // Update state or navigate to another page after successful booking
    } catch (error) {
      console.error("Error booking flight:", error);
      // Handle error, e.g., display an error message to the user
    }
  }
  };

  return username ? (
    <div className="Booking">
      <h2>Booking</h2>
      {flight ? (
        <div>
          <p>Flight Number: {flight.flight_id}</p>
          <p>Departure City: {flight.departure_city}</p>
          <p>Arrival City: {flight.arrival_city}</p>
          <p>Departure DateTime: {flight.departure_datetime}</p>
          <p>Arrival DateTime: {flight.arrival_datetime}</p>
          <p>Seat Count: {flight.seat_count}</p>
          <input type="number" name="qty" id="" placeholder="No of tickets" value={qty} onChange={(e) => setQty(e.target.value)}/>
          <button onClick={handleBooking}>Book Now</button>
        </div>
      ) : (
        <p>Loading flight information...</p>
      )}
    </div>
  ) : (
    <Login />
  );
};

export default Booking;
