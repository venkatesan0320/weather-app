import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import { useRouter } from "next/router";

const backgroundImage = ["/weather-img.jpg"];

export default function index({ cityLocation, getLocation }) {
  const router = useRouter();
  const [fetch, setFetch] = useState(false);
  const [weather, setWeather] = useState();
  const [city, setCity] = useState("");
  const [Dates, setDate] = useState();
  const [showWave, setShowWave] = useState(false);

  useEffect(() => {
    const { q } = router?.query;
    if (q) {
      setCity(q);
      setFetch(true);
    }
  }, [router?.query]);

  useEffect(() => {
    const fetchData = async () => {
      if (!fetch) return;
      const url = `https://api.tomorrow.io/v4/weather/realtime?location=${city}&apikey=${process.env.NEXT_PUBLIC_ACCESS_KEY}`;

      // Inside your fetch data function
      try {
        const response = await axios.get(url);
        setWeather(response?.data);
        speakWeather(response?.data); // Speak the weather information
      } catch (error) {
        setWeather(null);
        speak("Failed to fetch weather data. Please try again later.");
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, [fetch]);

  const handleChange = (event) => {
    setCity(event.target.value);
    setFetch(false);
  };

  const handleClick = () => {
    setFetch(true);
    if (city === "") {
      console.log("clear");
      router.push("/");
    } else {
      console.log("value");
      router.push({
        pathname: "/",
        query: { q: city },
      });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  const date = new Date(weather?.data?.time);
  const options = { timeZone: "Asia/Kolkata" };
  const formattedDate = date?.toLocaleString("en-US", options);

  useEffect(() => {
    if (formattedDate) {
      const formattedDateTime = new Date(formattedDate);

      const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      const dayOfWeek = days[formattedDateTime.getDay()];

      const day = formattedDateTime.getDate();
      const months = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ];
      const month = months[formattedDateTime.getMonth()];
      const year = formattedDateTime.getFullYear();
      let hours = formattedDateTime.getHours();
      const minutes = formattedDateTime.getMinutes();
      const seconds = formattedDateTime.getSeconds();
      const ampm = hours >= 12 ? "PM" : "AM";

      // Convert hours to 12-hour format
      hours = hours % 12;
      hours = hours ? hours : 12; // Handle midnight (0 hours)

      setDate({ dayOfWeek, day, month, year, hours, minutes, seconds, ampm });
    } else {
      console.log("Invalid date format");
    }
  }, [formattedDate]);

  const cityName = weather?.location?.name;
  // const cityName = cityName ? cityName.split(",")[0] : "";
  const handleMicIconClick = () => {
    setShowWave(true);
    handleLocationButtonClick();
  };

  const handleLocationButtonClick = async () => {
    try {
      const recognition = new window.webkitSpeechRecognition(); // for Chrome
      // const recognition = new window.SpeechRecognition(); // for other browsers
      recognition.lang = "en-US";
      recognition.continuous = false; // Disable continuous listening

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setCity(transcript);
        setFetch(true);
        // speak(
        //   `You asked for ${transcript}. Fetching weather data for ${transcript}`
        // );
      };

      recognition.start();
    } catch (error) {
      console.error("Speech recognition not supported:", error);
    }
  };

  const speak = (message) => {
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = "en-US";

    // Find a female voice
    const femaleVoice = window.speechSynthesis
      .getVoices()
      .find((voice) => voice.voiceURI.includes("Female"));

    // If a female voice is found, set it
    if (femaleVoice) {
      speech.voice = femaleVoice;
    }

    window.speechSynthesis.speak(speech);
  };

  const speakWeather = (weatherData) => {
    if (!weatherData) {
      speak("Weather data is not available.");
      return;
    }

    const city = weatherData?.location?.name;
    const temperature = weatherData?.data?.values?.temperature;
    const apparentTemperature = weatherData?.data?.values?.temperatureApparent;
    const windSpeed = weatherData?.data?.values?.windSpeed;
    const windGust = weatherData?.data?.values?.windGust;
    const uvIndex = weatherData?.data?.values?.uvIndex;
    const visibility = weatherData?.data?.values?.visibility;
    const humidity = weatherData?.data?.values?.humidity;
    const pressure = weatherData?.data?.values?.pressureSurfaceLevel;

    const message = `Current weather in ${city}. Temperature is ${temperature} degrees Celsius. Feels like ${apparentTemperature} degrees Celsius. Wind speed is ${windSpeed} kilometers per hour. Wind gust is ${windGust} kilometers per hour. UV index is ${uvIndex}. Visibility is ${visibility} kilometers. Humidity is ${humidity} percent. Pressure is ${pressure} millibars.`;

    speak(message);
  };

  return (
    <Box
      component={"section"}
      className="Weather-section"
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        width: "100%",
        height: "100vh",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {showWave && <div className="wave-animation" />}
      <Container maxWidth="xl" className="container">
        <Box component={"div"}>
          <Box component={"div"}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                onChange={handleChange}
                value={city}
                onKeyDown={handleKeyPress}
                placeholder="Search City"
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleMicIconClick}>
                      <MicIcon />
                    </IconButton>
                  ),
                  list: "city-suggestions",
                }}
                className="text-field"
                autoComplete="off"
              />

              {weather?.data && (
                <Box
                  component={"div"}
                  sx={{
                    display: "flex",

                    flexDirection: "column",

                    marginTop: "20px",
                    backdropFilter: "blur(35px)",
                    padding: "10px",
                    borderRadius: "20px",
                    background: "rgba(0,0,0,.25)",
                    width: { xs: "100%", sm: "unset" },
                    maxWidth: { xs: "unset", sm: "500px" },
                    minWidth: { xs: "unset", sm: "400px" },
                  }}
                >
                  <Box className="current-weather-box">
                    <Typography className="current-weather-title">
                      Current weather
                    </Typography>
                    <Typography className="all-dates">
                      {Dates?.dayOfWeek}, {Dates?.month} {Dates?.day}
                    </Typography>
                  </Box>

                  <Typography className="location">{cityName}</Typography>

                  <Box component={"div"} className="temprature-box">
                    <Typography className="temprature">
                      {weather?.data?.values?.temperature}
                      <span className="degree">°</span>
                      <span className="celcius">c</span>
                    </Typography>

                    <Box className="feels-temprature">
                      <Typography className="feelslike-title">
                        Feels like
                      </Typography>
                      <Typography className="feelslike-content">
                        {weather?.data?.values?.temperatureApparent}
                        <span>°</span>
                      </Typography>
                    </Box>
                  </Box>

                  <Box className="wind">
                    <Typography className="wind-title">Wind</Typography>
                    <Typography className="wind-content">
                      {weather?.data?.values?.windSpeed} km/h
                    </Typography>
                  </Box>

                  <Box className="wind">
                    <Typography className="wind-title">Wind Gust</Typography>
                    <Typography className="wind-content">
                      {weather?.data?.values?.windGust} km/h
                    </Typography>
                  </Box>

                  <Box className="wind">
                    <Typography className="wind-title">UV index</Typography>
                    <Typography className="wind-content">
                      {weather?.data?.values?.uvIndex}
                    </Typography>
                  </Box>

                  <Box className="wind">
                    <Typography className="wind-title">Visibility</Typography>
                    <Typography className="wind-content">
                      {weather?.data?.values?.visibility} km
                    </Typography>
                  </Box>
                  <Box className="wind">
                    <Typography className="wind-title">Humidity</Typography>
                    <Typography className="wind-content">
                      {weather?.data?.values?.humidity}%
                    </Typography>
                  </Box>
                  <Box className="wind">
                    <Typography className="wind-title">Pressure</Typography>
                    <Typography className="wind-content">
                      {weather?.data?.values?.pressureSurfaceLevel} mb
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
