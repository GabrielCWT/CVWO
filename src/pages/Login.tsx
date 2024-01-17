import { CurrentUserContext } from "../App";
import Link from "../components/Link";
import { Box, Container, TextField, Button, FormHelperText, Typography } from "@mui/material";
import { Navigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import axios, { AxiosError } from "axios";

const Login: React.FC = () => {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const [helperMessage, setHelperMessage] = useState<string>("");
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, data, {
                withCredentials: true,
            });
            setCurrentUser({ isSignedIn: true, username: data.get("username") as string });
        } catch (err) {
            const error = err as AxiosError;
            const errorMessage = JSON.parse(error.request.response).error;
            if (errorMessage === "Error finding user") {
                setHelperMessage("User not found");
            } else if (errorMessage === "Error validating password") {
                setHelperMessage("Incorrect password");
            } else {
                setHelperMessage("Unknown error");
            }
        }
    };
    if (currentUser.isSignedIn) {
        return <Navigate to="/" />;
    }
    return (
        <Container
            sx={{
                display: "grid",
            }}
        >
            <Typography component="h1" variant="h4" textAlign="center">
                Login Page
            </Typography>
            <Box component="form" sx={{ display: "grid", gap: 3 }} onSubmit={handleSubmit}>
                <Box display="grid" gap={2}>
                    <TextField id="username" name="username" label="Username" variant="standard" required autoFocus />
                    <TextField id="password" name="password" label="Password" variant="standard" required />
                </Box>
                <FormHelperText id="my-helper-text" error>
                    {helperMessage}
                </FormHelperText>
                <Link to="/signup">{"Don't have an account? Register here"}</Link>
                <Button type="submit" variant="contained">
                    Submit
                </Button>
            </Box>
        </Container>
    );
};

export default Login;
