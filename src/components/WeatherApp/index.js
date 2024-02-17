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

const backgroundImage = ["/weather-img.jpg"];

export default function index() {
  const router = useRouter();
  const [fetch, setFetch] = useState(false);
  const [data, setData] = useState();
  const [city, setCity] = useState("");
  console.log(data);
  console.log(router);

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
      router.push({
        pathname: "/",
        query: { q: city }
      });
      
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      if (!fetch) return; // Return early if fetch is false
      const url = `https://api.tomorrow.io/v4/weather/realtime?location=${city}&apikey=${process.env.NEXT_PUBLIC_ACCESS_KEY}`;
      try {
        const response = await axios.get(url);
        setData(response?.data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, [fetch]); // Run only when fetch changes
  const date = new Date(data?.data?.time);
  const options = { timeZone: "Asia/Kolkata" };
  const formattedDate = date?.toLocaleString("en-US", options);
  const cityName = data?.location?.name;
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
                // onKeyPress={handleKeyPress}

                onKeyDown={handleKeyPress}
                placeholder="Search City"
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleClick}>
                      <SearchIcon color="action" />
                    </IconButton>
                  ),
                }}
                className="text-field"
                autoComplete="off"
              />
              {data && (
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
                  {cityName && (
                    <Typography className="location">{cityName}</Typography>
                  )}
                  {data?.data?.values?.temperature && (
                    <Typography className="temprature">
                      {data?.data?.values?.temperature}
                      <span className="degree">°</span>
                      <span className="celcius">c</span>
                    </Typography>
                  )}

                  {data?.data?.values?.windSpeed && (
                    <Box className="wind">
                      <Typography className="wind-title">Wind</Typography>
                      <Typography className="wind-content">
                        {data?.data?.values?.windSpeed} km/h
                      </Typography>
                    </Box>
                  )}

                  {data?.data?.values?.windGust && (
                    <Box className="wind">
                      <Typography className="wind-title">Wind Gust</Typography>{" "}
                      <Typography className="wind-content">
                        {data?.data?.values?.windGust} km/h
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
