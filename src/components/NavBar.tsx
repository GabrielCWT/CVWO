import Link from "./Link";
import { CurrentUserContext } from "../App";
import React, { useContext } from "react";
import { AppBar, Toolbar } from "@mui/material";

const NavBar: React.FC = () => {
    const { currentUser } = useContext(CurrentUserContext);
    return (
        <AppBar position="sticky">
            <Toolbar sx={{ gap: 8, alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                <Link to="/" fontColor="white">
                    Home
                </Link>
                <Link to="/test" fontColor="white">
                    Posts
                </Link>
                <Link to="/create" fontColor="white">
                    Create
                </Link>
                {currentUser.isSignedIn ? (
                    <Link to="/logout" fontColor="white">
                        Logout
                    </Link>
                ) : (
                    <>
                        <Link to="/signup" fontColor="white">
                            Signup
                        </Link>
                        <Link to="/login" fontColor="white">
                            Login
                        </Link>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
