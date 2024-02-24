// import React from "react";
// import { useEffect, useState } from "react";
import WeatherApp from "@/components/WeatherApp/index"

// export default function index() {
//   const [city, setCity] = useState("");
//   console.log(city);


//   const fetchCurrentCity = async () => {
//     // setIsLoading(true);
//     try {
//       // Check if geolocation is available
//       if ("geolocation" in navigator) {
//         navigator.geolocation.getCurrentPosition(async (position) => {
//           const { latitude = "11.645733", longitude = "78.921925" } = position.coords;
//           // Make a reverse geocoding request to OpenStreetMap Nominatim API
//           const response = await fetch(
//             `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=${process.env.NEXT_PUBLIC_ACCESS_KEY2}`
//           );
//           const data = await response.json();
          
//           setCity(data);
      
//         });
//       } else {
//         console.error("Geolocation is not available");
//       }
//     } catch (error) {
//       console.error("Error fetching city:", error);
//     } finally {
//     //   setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCurrentCity();
//   }, []); // Fetch current city when the component mounts
//   return (
//     <div>
     
//       {/* <WeatherApp cityLocation={city}/> */}
//     </div>
//   );
// }

import { useState } from 'react';


const index = () => {
  const [location, setLocation] = useState(null);
//   console.log(location);
const mainLocation = {location}

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation({Latitude: `${latitude}`, Longitude: `${longitude}`});
      }, (error) => {
        console.error('Error getting location:', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div>


      <WeatherApp cityLocation={mainLocation} getLocation={getLocation}/>
    </div>
  );
};

export default index;
