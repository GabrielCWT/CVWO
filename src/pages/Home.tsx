import { CurrentUserContext } from "../App";
import React, { useContext, useState } from "react";
import { Box, Button, Container, Fade, Typography } from "@mui/material";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";
const Home: React.FC = () => {
    const { currentUser } = useContext(CurrentUserContext);
    const [isTyping, setIsTyping] = useState<boolean>(true);
    const navigate = useNavigate();
    return (
        <Container>
            <Typography component="div" variant="h5" textAlign="center">
                {currentUser.isSignedIn ? (
                    <TypeAnimation
                        cursor={false}
                        sequence={[
                            `Welcome back ${currentUser.username}`,
                            () => {
                                setIsTyping(false);
                            },
                        ]}
                        wrapper="h1"
                    />
                ) : (
                    <TypeAnimation
                        cursor={false}
                        sequence={[
                            "Welcome to the CWVO",
                            300,
                            "Welcome to the C",
                            300,
                            "Welcome to the CVWO Forum",
                            () => {
                                setIsTyping(false);
                            },
                        ]}
                        deletionSpeed={30}
                        wrapper="h1"
                    />
                )}
            </Typography>
            {!isTyping && !currentUser.isSignedIn ? (
                <Box display="flex" fontSize="1.2rem" justifyContent="center" gap={3}>
                    <Fade in={true}>
                        <Button variant="outlined" size="large" onClick={() => navigate("/signup")}>
                            Sign Up
                        </Button>
                    </Fade>
                    <Fade in={true}>
                        <Button variant="contained" size="large" color="primary" onClick={() => navigate("/login")}>
                            Log In
                        </Button>
                    </Fade>
                </Box>
            ) : null}
        </Container>
    );
};

export default Home;
