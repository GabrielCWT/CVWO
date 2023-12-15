import { CurrentUserContext } from "../App";
import { Box, Container, TextField, Button, FormHelperText } from "@mui/material";
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
            const res = await axios.post("http://localhost:8000/auth/signup", data);
            console.log(res);
            setCurrentUser({ isSignedIn: true, username: data.get("username") as string });
        } catch (err) {
            const error = err as AxiosError;
            const errorMessage = JSON.parse(error.request.response).error;
            if (errorMessage === "Error validating password") {
                setHelperMessage("User already exists");
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
                "& > :not(style)": { textAlign: "center" },
                display: "grid",
            }}
        >
            <h1>Signup Page</h1>
            <Box component="form" sx={{ display: "grid", gap: 5 }} onSubmit={handleSubmit}>
                <TextField id="username" name="username" label="Username" variant="standard" required autoFocus />
                <TextField id="password" name="password" label="Password" variant="standard" required autoFocus />
                <FormHelperText id="my-helper-text">{helperMessage}</FormHelperText>
                <Button type="submit" variant="contained">
                    Submit
                </Button>
            </Box>
        </Container>
    );
};

export default Login;
