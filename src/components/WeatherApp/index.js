import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";

import Location from "@/components/Location/index";
const backgroundImage = ["/weather-img.jpg"];

export default function index({ cityLocation, getLocation }) {

  const router = useRouter();
  const [fetch, setFetch] = useState(false);
  const [weather, setWeather] = useState();
  const [city, setCity] = useState("");

 
console.log(weather,"weather");


  


  useEffect(() => {
    // Update the city state when the query changes in the router
    const { q } = router?.query;
    if (q) {
      setCity(q);
      setFetch(true);
 

    }
  }, [router?.query]);

  const handleChange = (event) => {
    setCity(event.target.value);
    setFetch(false);

  };

  const handleClick = () => {
    setFetch(true);

  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleClick();

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
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!fetch) return; // Return early if fetch is false
      const url = `https://api.tomorrow.io/v4/weather/realtime?location=${city}&apikey=${process.env.NEXT_PUBLIC_ACCESS_KEY}`;

      try {
        const response = await axios.get(url);
        setWeather(response?.data);

      } catch (error) {
        setWeather("please try again later");
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, [fetch]); // Run only when fetch changes







  const date = new Date(weather?.data?.time);
  const options = { timeZone: "Asia/Kolkata" };
  const formattedDate = date?.toLocaleString("en-US", options);
  const cityName = weather?.location?.name;
  // const cityName = cityName ? cityName.split(",")[0] : "";

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
                    <IconButton onClick={getLocation}>📍</IconButton>
                  ),
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
                  <Typography className="current-weather-title">
                    Current weather
                  </Typography>
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
