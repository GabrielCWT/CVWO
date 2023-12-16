import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

const Loading: React.FC = () => {
    return (
        <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
            <Typography variant="h5">Loading data from server...</Typography>
            <CircularProgress />
        </Box>
    );
};

export default Loading;
