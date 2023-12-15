import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link as MUILink } from "@mui/material";

interface Props {
    to: string;
    children: string;
    fontColor?: string;
}

const Link: React.FC<Props> = ({ to, children, fontColor }) => {
    return (
        <MUILink component={RouterLink} to={to} sx={{ color: fontColor }}>
            {children}
        </MUILink>
    );
};

export default Link;
