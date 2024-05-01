import { AppBar, Button, IconButton, Toolbar } from "@mui/material";
import React from "react";
import NytSvg from "./NytSvg";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <AppBar
      elevation={0}
      width={"100vw"}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        bgcolor: "whitesmoke",
        position: "static",

        mb: "10px",
        borderBottom: "2px solid black",
      }}
    >
      <Toolbar>
        <NytSvg />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
