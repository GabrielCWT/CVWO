import Link from "./Link";
import { CurrentUserContext } from "../App";
import React, { useContext } from "react";
import { AppBar, Toolbar } from "@mui/material";

const NavBar: React.FC = () => {
    const { currentUser } = useContext(CurrentUserContext);
    return (
        <AppBar position="sticky">
            <Toolbar sx={{ gap: 8, alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                <Link to="/">Home</Link>
                <Link to="/test">Posts</Link>
                <Link to="/create">Create</Link>
                {currentUser.isSignedIn ? (
                    <Link to="/logout">Logout</Link>
                ) : (
                    <>
                        <Link to="/signup">Signup</Link>
                        <Link to="/login">Login</Link>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
