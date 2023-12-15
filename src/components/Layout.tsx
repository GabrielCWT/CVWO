import NavBar from "./NavBar";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
};

export default Layout;
