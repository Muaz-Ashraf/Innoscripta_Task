import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
	Container,
	Grid,
	Typography,
	Button,
	Stack,
	TextField,
	Card,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import Loader from "./Loader";
import Animation from "./Animation";

const SearchStories = () => {
	const navigate = useNavigate();
	const [data, setData] = useState(new Map());
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(0);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [search, setSearch] = useState("");
	const [errorMsg, setErrorMsg] = useState(null);
	const [searchResults, setSearchResults] = useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		setSearchResults(search);
		setIsSubmitted(true);
		setLoading(true);
		setPage(0);
		setData(new Map());
	};

	useEffect(() => {
		if (isSubmitted) {
			const getData = async () => {
				try {
					setErrorMsg(null);
					if (data?.has(page)) {
						setLoading(false);
						return;
					}
					const response = await axios.get(
						`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${search}&page=${page}&api-key=vpPk0dSc3wlSGZUQriw78bkglP22tr2E`
					);
					const newData = new Map(data);
					newData.set(page, response.data.response.docs);
					setData(newData);
					setLoading(false);
					console.log(response);
					console.log(data);
				} catch (error) {
					console.error("An error occurred:", error);
					setErrorMsg(error.response);
					setLoading(false);
					setData(new Map());
					setSearchResults(null);
				}
			};

			setLoading(true);
			getData();
		}
	}, [isSubmitted, searchResults, page]);

	return (
		<Container sx={{ mb: 4 }}>
			<form onSubmit={handleSubmit}>
				<Stack
					direction={"row"}
					spacing={2}
					sx={{ mb: 2, justifyContent: "center" }}
				>
					<TextField
						InputProps={{
							style: { backgroundColor: "#202020", color: "white" },
						}}
						size="small"
						name="search"
						id="search"
						placeholder="Search for articles"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<Button
						disabled={(loading || search === "") && true}
						sx={{ bgcolor: "black", "&:hover": { bgcolor: "#00000095" } }}
						variant="contained"
						type="submit"
					>
						Search
					</Button>
				</Stack>
			</form>
			{errorMsg && (
				<Typography
					mt={5}
					color="red"
					textAlign={"center"}
				>
					Status Code {errorMsg.status} - {errorMsg.statusText}
				</Typography>
			)}
			{loading && isSubmitted ? (
				<Loader />
			) : (
				<Animation>
					{searchResults && (
						<Stack
							direction={"row"}
							alignItems={"center"}
							my={1}
							spacing={1}
						>
							<Typography fontWeight={"bold"}>Search Results for:</Typography>
							<Typography>{searchResults}</Typography>
						</Stack>
					)}
					<Grid
						container
						spacing={2}
						style={{ display: "flex", flexWrap: "wrap" }}
					>
						{!errorMsg &&
							Array.from(data.get(page) ?? []).map((story, index) => (
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
										<Stack direction="column">
											<Typography
												fontWeight="bold"
												sx={{
													display: "flex",
													justifyContent: "center",
													alignItems: "center",

													bgcolor: "silver",
													color: "black",
													px: 1,
													border: "1px solid black",
													borderTop: "none",
													borderLeft: "none",
													maxWidth: "25px",
													minWidth: "25px",
												}}
											>
												{index + 1 * page * 10 + 1}.
											</Typography>
											<Typography
												py={2}
												px={3}
											>
												{story.headline.main}
											</Typography>
										</Stack>
									</Card>
								</Grid>
							))}
					</Grid>
				</Animation>
			)}
			{!errorMsg && isSubmitted && (
				<Stack
					direction={"row"}
					mt={2}
					display={"flex"}
					justifyContent={"space-between"}
					alignItems={"center"}
				>
					<Button
						disabled={loading || page === 0}
						onClick={() => {
							setPage((prevPage) => prevPage - 1);
							setLoading(true);
						}}
					>
						<ArrowBack />
						Previous
					</Button>

					<Typography
						textAlign={"center"}
						fontWeight={"bold"}
					>
						Page {page + 1}
					</Typography>
					<Button
						disabled={loading}
						onClick={() => {
							setPage((prevPage) => prevPage + 1);
							setLoading(true);
						}}
					>
						Next
						<ArrowForward />
					</Button>
				</Stack>
			)}
		</Container>
	);
};

export default SearchStories;
