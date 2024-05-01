import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
	Button,
	Container,
	Divider,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchBy from "./SearchBy";

const Login = () => {
	const { register, handleSubmit } = useForm();
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const onSubmit = async (data) => {
		try {
			const response = await axios.post(
				"http://localhost:8000/auth/login",
				data
			);
			console.log(response.data);
			sessionStorage.setItem("accessToken", response.data.access_token);
			setIsLoggedIn(true);
		} catch (error) {
			console.error("An error occurred:", error);
		}
	};
	const navigate = useNavigate();

	return (
		<Container
			maxWidth={"sm"}
			sx={{
				mt: "4rem",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				paddingX: "5rem",
			}}
		>
			{!isLoggedIn ? (
				<>
					<Typography
						variant="h5"
						fontWeight={"bold"}
						gutterBottom
					>
						Login
					</Typography>
					<form
						onSubmit={handleSubmit(onSubmit)}
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							width: "100%",
						}}
					>
						<TextField
							type="email"
							label="Email"
							variant="outlined"
							fullWidth
							{...register("email")}
							sx={{ marginBottom: 2 }}
						/>
						<TextField
							type="password"
							label="Password"
							variant="outlined"
							fullWidth
							{...register("password")}
							sx={{ marginBottom: 2 }}
						/>
						<Button
							fullWidth
							variant="contained"
							color="primary"
							type="submit"
							sx={{
								marginTop: 2,
								bgcolor: "black",
								"&:hover": {
									bgcolor: "black",
								},
							}}
						>
							Login
						</Button>

						<Button
							fullWidth
							variant="contained"
							color="primary"
							sx={{
								marginTop: 2,
								bgcolor: "black",
								"&:hover": {
									bgcolor: "black",
								},
							}}
							onClick={() => navigate("/category")}
						>
							Login as Guest
						</Button>
					</form>
					<Stack
						mt={1}
						direction={"row"}
						alignItems={"center"}
						spacing={2}
					>
						<Typography>Don't have an account</Typography>
						<Button onClick={() => navigate("/registration")}>
							Sign UP
						</Button>{" "}
					</Stack>{" "}
				</>
			) : (
				<Typography
					variant="h5"
					fontWeight={"bold"}
					gutterBottom
				>
					Logged In
				</Typography>
			)}
		</Container>
	);
};

export default Login;
