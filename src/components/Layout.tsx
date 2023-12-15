import NavBar from "./NavBar";
import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
    return (
        <>
            <NavBar />
            <Container component="main" sx={{ padding: 2 }}>
                <Outlet />
            </Container>
        </>
    );
};

export default Layout;
