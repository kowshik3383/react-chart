import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from "react-apexcharts";

const App = () => {
  const [requestData, setRequestData] = useState([]);
  const [hotelData, setHotelData] = useState([]);

  useEffect(() => {
    axios.get('https://checkinn.co/api/v1/int/requests')
      .then(response => {
        setRequestData(response.data.requests);
        const hotels = response.data.requests.reduce((acc, request) => {
          if (!acc.some(hotel => hotel.id === request.hotel.id)) {
            acc.push(request.hotel);
          }
          return acc;
        }, []);
        setHotelData(hotels);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1 className="chart-headline">Requests  by Hotel</h1>
      <Chart
      class="chart"
      
        options={{
          chart: {
          
          },
          xaxis: {
            categories: hotelData.map(hotel => hotel.name),
          },
        }}
        series={[{
          name: 'Requests',
          data: hotelData.map(hotel => requestData.filter(request => request.hotel.id === hotel.id).length),
        }]}
        type="line"
        width="800"
      />
      <h1>Requests</h1>
      <div>
        {hotelData.map(hotel => (
          <div key={hotel.id}>
            <h2>{hotel.name}</h2>
            <ul>
              {requestData.filter(request => request.hotel.id === hotel.id).map(request => (
                <li key={request.id}>
                  <strong>{request.name}</strong> - {request.comments}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default App;
