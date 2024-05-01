import { Box } from "@mui/material";
import React from "react";
import { MagnifyingGlass } from "react-loader-spinner";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <MagnifyingGlass
        visible={true}
        height="150"
        width="150"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="skyblue"
        color="black"
      />
    </Box>
  );
};

export default Loader;
