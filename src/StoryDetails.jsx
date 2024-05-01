import { ArrowBack, ArrowForward, Circle } from "@mui/icons-material";
import {
	Box,
	Button,
	Container,
	List,
	ListItem,
	Typography,
} from "@mui/material";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const StoryDetails = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const { story } = location.state;
	console.log(story);

	return (
		<>
			{story ? (
				<Container>
					<Typography
						fontWeight={"bold"}
						fontSize={"1.5rem"}
					>
						{story.title ?? story.headline.main.toString()}
					</Typography>
					<Typography
						variant="body"
						textAlign={"justify"}
					>
						{story.abstract}
					</Typography>
					<Typography fontStyle={"italic"}>
						{story.byline.original
							? story.byline.original
							: story.byline
							? story.byline
							: ""}
					</Typography>
					{story.multimedia && (
						<>
							<Box
								sx={{
									display: "flex",
									height: "250px",
									width: "auto",
									maxWidth: "100%",
								}}
								component="img"
								src={story?.multimedia[0]?.url}
								alt="Article Image"
							></Box>{" "}
							<Typography
								variant="p"
								fontSize={"0.8rem"}
							>
								{story?.multimedia[0]?.caption}
							</Typography>
						</>
					)}
					{story.des_facet && (
						<>
							<Typography
								fontWeight={"bold"}
								fontSize={"1rem"}
							>
								Topics
							</Typography>

							{story.des_facet?.map((item, index) => {
								return (
									<List
										key={index}
										sx={{ p: 0 }}
									>
										<ListItem sx={{ py: 0 }}>
											<Circle sx={{ fontSize: "0.4rem", mr: 1 }} />
											{item}
										</ListItem>
									</List>
								);
							})}
						</>
					)}
					<Typography>
						You can read the complete article here:{" "}
						<Link to={story.url ?? story.web_url}>
							<Button
								variant="outlined"
								sx={{
									transition: "all 0.3s ease-in-out",
									color: "black",
									"&:hover": {
										"& .MuiButton-endIcon": {
											transform: "rotate(-45deg)",
										},
										bgcolor: "black",
										color: "white",
									},
								}}
								endIcon={<ArrowForward />}
							>
								NYTIMES
							</Button>
						</Link>
					</Typography>
					<Box sx={{ my: 5 }}>
						<Button
							variant="contained"
							sx={{
								bgcolor: "black",
								"&:hover": {
									bgcolor: "white",
									color: "black",
								},
							}}
							startIcon={<ArrowBack />}
							onClick={() =>
								story.des_facet ? navigate("/category") : navigate("/search")
							}
						>
							{story.des_facet ? "Back to Category" : "Back to Article Search"}
						</Button>
					</Box>
				</Container>
			) : (
				<p>No Story found</p>
			)}
		</>
	);
};

export default StoryDetails;
