import React, { useEffect, useState } from "react";
import Login from "../Login/Login";
import { useAuth } from "../../Context/AuthContext"; // Import the useAuth hook
import axios from "axios";
import "./FlightSearch.scss";
import {format} from 'date-fns';
import { Link, useNavigate } from "react-router-dom";

const FlightSearch = () => {
    const navigate = useNavigate();
    const {username} = useAuth();
    const [departureCity, setDepartureCity] = useState('');
    const [arrivalCity, setArrivalCity] = useState('');
    const [departureDateTime, setDepartureDateTime] = useState('');
    const [arrivalDateTime, setArrivalDateTime] = useState('');
    const [seatCount, setSeatCount] = useState(60);
    const [flights, setFlights] = useState([]);


    const handleSearch = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/flights/search', { departureCity, arrivalCity, departureDateTime, arrivalDateTime, seatCount });
            // Handle successful flight search response
            setFlights(response.data.map(flight => ({
              ...flight,
              departure_datetime: format(new Date(flight.departure_datetime), 'yyyy-MM-dd HH:mm:ss'),
              arrival_datetime: format(new Date(flight.arrival_datetime), 'yyyy-MM-dd HH:mm:ss')
          })));
            console.log('Flight search successful:', response.data);

        } catch (error) {
            // Handle flight search error
            console.error('Flight search error:', error.response.data);
        }
    };

  return username ? (
    
       <div className="FlightSearch">
            <h2>Flight Search</h2>
            <div className="form">
            <input type="text" placeholder="Departure City" value={departureCity} onChange={(e) => setDepartureCity(e.target.value)} />
            <input type="text" placeholder="Arrival City" value={arrivalCity} onChange={(e) => setArrivalCity(e.target.value)} />
            <input type="datetime-local" placeholder="Departure DateTime" value={departureDateTime} onChange={(e) => setDepartureDateTime(e.target.value)} />
            <input type="datetime-local" placeholder="Arrival DateTime" value={arrivalDateTime} onChange={(e) => setArrivalDateTime(e.target.value)} />
            <input type="number" placeholder="Seat Count" value={seatCount} onChange={(e) => setSeatCount(e.target.value)} />
            <button onClick={handleSearch}>Search Flights</button>
            </div>
            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <th>Departure City</th>
                            <th>Arrival City</th>
                            <th>Departure DateTime</th>
                            <th>Arrival DateTime</th>
                            <th>Seat Count</th>
                            {/* <th></th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {flights.map((flight, index) => (
                            <tr key={index} onClick={()=>(navigate(`/booking?flightId=${flight.flight_id}`))}>
                                <td>{flight.departure_city}</td>
                                <td>{flight.arrival_city}</td>
                                <td>{flight.departure_datetime}</td>
                                <td>{flight.arrival_datetime}</td>
                                <td>{flight.seat_count}</td>
                                {/* <td ><Link to={`/booking?flightId=${flight.flight_id}`}>Book</Link></td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
  ) : (
    <Login />
  ); // Render Login component if user is not authenticated
};

export default FlightSearch;
