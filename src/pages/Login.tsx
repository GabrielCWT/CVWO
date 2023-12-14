import { Box, Container, TextField, Button } from "@mui/material";
import React from "react";
import axios from "axios";

const Login: React.FC = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        console.log({
            username: data.get("username"),
            password: data.get("password"),
        });
        axios.post("http://localhost:8000/auth/login", data).then((response) => {
            console.log(response);
        });
    };
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
                <Button type="submit" variant="contained">
                    Submit
                </Button>
            </Box>
        </Container>
    );
};

export default Login;
