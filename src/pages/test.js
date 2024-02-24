// WeatherComponent.js

import axios from "axios";
import { useEffect, useState } from "react";

export default function WeatherComponent() {
  // Function to fetch weather data

  const [item, setItem] = useState();
  console.log(item);


  
  const fetchWeatherData = async () => {
    const options = {
      method: 'GET',
      url: 'https://booking-com.p.rapidapi.com/v1/hotels/data',
      params: {
        hotel_id: '1377073',
        locale: 'en-gb'
      },
      headers: {
        'X-RapidAPI-Key': '513e1a1230msh6d9d78650b7e152p1a4448jsnd195a916cf97',
        'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch weather data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWeatherData();

        setItem(data);
        // Set the weather data in state or do something with it
      } catch (error) {
        // Handle error
        console.error("Failed to fetch weather data:", error);
      }
    };
    fetchData();
  }, []); // Empty dependency array to run effect only once on component mount

  return (
    <div>
      {/* Render weather data */}
      {/* You can render weatherData here if you receive it as props */}
    </div>
  );
}
