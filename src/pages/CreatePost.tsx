import { Box, Container, TextField } from "@mui/material";
import React from "react";

const CreatePost: React.FC = () => {
    return (
        <Container>
            <h1>{"Create Post"}</h1>
            <Box component="form">
                <TextField id="title" label="Title" variant="standard" required />
                <TextField id="content" label="Content" variant="outlined" multiline fullWidth required />
            </Box>
        </Container>
    );
};

export default CreatePost;
