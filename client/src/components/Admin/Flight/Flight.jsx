import React, { useEffect, useState } from 'react'
import "./Flight.scss";
import { useAuth } from '../../../Context/AuthContext';
import axios from 'axios';
import {format} from "date-fns";
const Flight = () => {
  const {admin} = useAuth();
  const [flights, setFlights] = useState([])

  const loadFlights = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/v1/flights/')
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
  useEffect(() => {
  
    
    loadFlights();
  }, [])

  return admin ? (
    
    <div className="Flight">
         <h2>Flights</h2>
         
         <div className="table" >
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
                         <tr key={index} >
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
);
}

export default Flight