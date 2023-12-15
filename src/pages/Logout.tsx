import { CurrentUserContext } from "../App";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";

const Logout: React.FC = () => {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const handleLogout = () => {
        axios.post("http://localhost:8000/auth/logout", {}, { withCredentials: true }).then(() => {
            setCurrentUser({ isSignedIn: false, username: "" });
        });
    };
    if (!currentUser.isSignedIn) {
        return <Navigate to="/" />;
    }
    return (
        <Container
            sx={{
                "& > :not(style)": { textAlign: "center" },
                display: "grid",
                justifyContent: "center",
            }}
        >
            <Typography variant="h3" component="h1">
                Logout Page
            </Typography>
            <Box sx={{ display: "flex", gap: 4 }} onSubmit={handleLogout}>
                <Typography variant="h4" component="h2">
                    Are you sure you want to logout?
                </Typography>
                <Button type="submit" variant="contained" onClick={handleLogout}>
                    Logout
                </Button>
            </Box>
        </Container>
    );
};

export default Logout;
