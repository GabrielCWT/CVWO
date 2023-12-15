import Link from "./Link";
import { CurrentUserContext } from "../App";
import React, { useContext } from "react";
import { AppBar, Toolbar } from "@mui/material";

const NavBar: React.FC = () => {
    const { currentUser } = useContext(CurrentUserContext);
    return (
        <AppBar position="sticky">
            <Toolbar sx={{ gap: 8, alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                <Link to="/" sx={{ color: "white" }}>
                    Home
                </Link>
                <Link to="/test" sx={{ color: "white" }}>
                    Posts
                </Link>
                <Link to="/create" sx={{ color: "white" }}>
                    Create
                </Link>
                {currentUser.isSignedIn ? (
                    <Link to="/logout" sx={{ color: "white" }}>
                        Logout
                    </Link>
                ) : (
                    <>
                        <Link to="/signup" sx={{ color: "white" }}>
                            Signup
                        </Link>
                        <Link to="/login" sx={{ color: "white" }}>
                            Login
                        </Link>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
