import Link from "./Link";
import React from "react";
import { AppBar, Toolbar } from "@mui/material";

const NavBar: React.FC = () => {
    return (
        <AppBar position="sticky">
            <Toolbar sx={{ gap: 8, alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                <Link to="/">Home</Link>
                <Link to="/test">Posts</Link>
                <Link to="/create">Create</Link>
                <Link to="/signup">Signup</Link>
                <Link to="/login">Login</Link>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
