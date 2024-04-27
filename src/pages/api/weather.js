// weatherAPI.js

const axios = require("axios");

async function fetchWeatherData() {
  const url = "https://weatherapi-com.p.rapidapi.com/current.json";

  try {
    const response = await axios(url);
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error; // Re-throwing the error for handling in the calling code
  }
}

module.exports = fetchWeatherData;
