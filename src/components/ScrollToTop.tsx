import { useScrollTrigger, Fade, Box, Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import React from "react";

const ScrollToTop: React.FC = () => {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
    });
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return (
        <Fade in={trigger}>
            <Box onClick={scrollToTop} role="presentation" sx={{ position: "fixed", bottom: 16, right: 16 }}>
                <Fab size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </Box>
        </Fade>
    );
};
export default ScrollToTop;
