import MultiSelect from "../components/Form/MultiSelect";
import { Box, Container, TextField } from "@mui/material";
import React from "react";

const categories = ["Technology", "Sports", "Politics", "Entertainment", "Science", "Health"];

const CreatePost: React.FC = () => {
    return (
        <Container>
            <h1>{"Create Post"}</h1>
            <Box component="form">
                <TextField id="title" label="Title" variant="standard" required />
                <MultiSelect label="Tags" options={categories} />
                <TextField id="content" label="Content" variant="outlined" multiline fullWidth required />
            </Box>
        </Container>
    );
};

export default CreatePost;
