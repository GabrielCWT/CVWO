import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link as MUILink } from "@mui/material";

interface Props {
    to: string;
    children: string;
}

const cssProperties = {
    color: "white",
};

const Link: React.FC<Props> = ({ to, children }) => {
    return (
        <MUILink component={RouterLink} to={to} sx={cssProperties}>
            {children}
        </MUILink>
    );
};

export default Link;
