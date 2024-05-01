import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MagnifyingGlass } from "react-loader-spinner";
import axios from "axios";
import Loader from "./Loader";
import Animation from "./Animation";
import { NYTIMES_APIKEY, NYTIMES_BASEURL } from "./constants/constants";

const TopStoriesList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [section, setSection] = useState("home");

  const getData = async () => {
    try {
      const response = await axios.get(
        `${NYTIMES_BASEURL}svc/topstories/v2/${section}.json?api-key=${NYTIMES_APIKEY}`
      );

      setData(response.data.results);
      setLoading(false);

      console.log(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getData();
  }, [section]);

  return (
    <Container sx={{ mb: 4 }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        mb={2}
        spacing={1}
      >
        <Typography fontWeight={"bold"} component="label" htmlFor="cat">
          Category:
        </Typography>
        <Select
          sx={{
            bgcolor: "black",
            color: "white",
            "& .MuiSvgIcon-root": {
              color: "white",
            },
          }}
          id="cat"
          name="category"
          size="small"
          onChange={(e) => setSection(e.target.value)}
          value={section}
        >
          <MenuItem value="home">Home</MenuItem>
          <MenuItem value="world">World</MenuItem>
          <MenuItem value="science">Science</MenuItem>
        </Select>
      </Stack>

      <Card sx={{ p: 1, mb: 2, color: "white", bgcolor: "black" }}>
        <Typography
          fontWeight={"bold"}
          textAlign={"center"}
          fontSize={"1.5rem"}
        >
          {section.toUpperCase()}
        </Typography>
      </Card>

      {loading ? (
        <Loader />
      ) : (
        <Animation>
          <Grid
            container
            spacing={2}
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            {data
              ?.filter((item) => item.title !== "")
              .map((story, index) => (
                <Grid
                  key={index}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  sx={{ display: "flex" }}
                >
                  <Card
                    onClick={() =>
                      navigate(`/details/${index}`, { state: { story: story } })
                    }
                    sx={{
                      boxShadow: 2,
                      flex: 1,
                      display: "flex",

                      bgcolor: "#202020",
                      color: "white",

                      border: "1px solid black",

                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        bgcolor: "white",
                        color: "black",

                        cursor: "pointer",
                      },
                    }}
                  >
                    <Stack direction="row">
                      <Typography
                        fontWeight="bold"
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",

                          bgcolor: "silver",
                          color: "black",
                          px: 1,
                          maxWidth: "25px",
                          minWidth: "25px",
                        }}
                      >
                        {index + 1}.
                      </Typography>
                      <Typography py={2} px={3}>
                        {story.title}
                      </Typography>
                    </Stack>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Animation>
      )}
    </Container>
  );
};

export default TopStoriesList;
