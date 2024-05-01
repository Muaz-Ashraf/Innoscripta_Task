import { Button, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBy = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const pathnameEnd = pathname.split("/").slice(-1)[0];
  const isDetailsPage =
    Number.isInteger(Number(pathnameEnd)) || pathname === "/registration";

  return (
    !isDetailsPage && (
      <>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          mb={2}
          spacing={1}
        >
          <Typography fontWeight={"bold"}>Search by:</Typography>
          <Button
            sx={{
              bgcolor: pathname === "/category" ? "black" : "white",
              color: pathname === "/category" ? "white" : "black",
              "&:hover": { bgcolor: "#00000095", color: "black" },
            }}
            variant="contained"
            onClick={() => navigate("/category")}
          >
            Category
          </Button>
          <Button
            sx={{
              bgcolor: pathname === "/search" ? "black" : "white",
              color: pathname === "/search" ? "white" : "black",
              "&:hover": { bgcolor: "#00000095", color: "black" },
            }}
            variant="contained"
            onClick={() => navigate("/search")}
          >
            Keyword
          </Button>
        </Stack>
        <Divider sx={{ mb: 1 }} />
      </>
    )
  );
};
export default SearchBy;
