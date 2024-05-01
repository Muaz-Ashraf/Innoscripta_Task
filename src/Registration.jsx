import React from "react";
import { useForm } from "react-hook-form";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
	const { register, handleSubmit } = useForm();

	const onSubmit = async (data) => {
		try {
			const response = await axios.post(
				"http://localhost:8000/auth/register",
				data
			);
			console.log(response.data);
		} catch (error) {
			console.error("An error occurred:", error);
		}
	};
	const navigate = useNavigate();

	return (
		<Container
			maxWidth="sm"
			sx={{
				mt: "4rem",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				paddingX: "5rem",

				borderRadius: 1,
			}}
		>
			<Typography
				variant="h5"
				fontWeight={"bold"}
				gutterBottom
			>
				Registration
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
					Register
				</Button>
			</form>
			<Stack
				mt={1}
				direction={"row"}
				alignItems={"center"}
				spacing={2}
			>
				<Typography>Already have an account</Typography>
				<Button
					variant="outlined"
					sx={{
						color: "black",
					}}
					onClick={() => navigate("/")}
				>
					Login
				</Button>
			</Stack>
		</Container>
	);
};

export default Registration;
