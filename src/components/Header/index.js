import { AppBar, Box, Container, Toolbar } from "@mui/material";
import React from "react";

export default function index() {
  return (
    <Box component={"section"}>
      <AppBar
        sx={{
          backgroundColor: "transparent !important",
          boxShadow: "none",
          // backdropFilter: "blur(1px) !important",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters></Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
