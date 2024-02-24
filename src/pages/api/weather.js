// weatherAPI.js

const axios = require("axios");

async function fetchWeatherData() {
  const options = {
    method: "GET",
    url: "https://weatherapi-com.p.rapidapi.com/current.json",
    params: { q: "53.1,-0.13" },
    headers: {
      "X-RapidAPI-Key": "513e1a1230msh6d9d78650b7e152p1a4448jsnd195a916cf97",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error; // Re-throwing the error for handling in the calling code
  }
}

module.exports = fetchWeatherData;
