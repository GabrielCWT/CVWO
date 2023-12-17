import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link as MUILink } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";

interface Props {
    to: string;
    children: string;
    sx?: SxProps<Theme>;
}

const Link: React.FC<Props> = ({ to, children, sx }) => {
    return (
        <MUILink component={RouterLink} to={to} sx={sx} underline="none">
            {children}
        </MUILink>
    );
};

export default Link;
