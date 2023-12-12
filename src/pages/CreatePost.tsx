import MultiSelect from "../components/Form/MultiSelect";
import { Box, Container, TextField, Button } from "@mui/material";
import React from "react";

const categories = ["Technology", "Sports", "Politics", "Entertainment", "Science", "Health"];

const CreatePost: React.FC = () => {
    return (
        <Container>
            <h1>{"Create Post"}</h1>
            <Box
                component="form"
                sx={{ "& > :not(style)": { m: 1 }, display: "grid" }}
                method="POST"
                action="http://www.foo.com"
            >
                <TextField id="title" name="title" label="Title" variant="standard" required autoFocus />
                <MultiSelect label="Tags" name="tags" options={categories} />
                <TextField
                    id="content"
                    name="content"
                    label="Content"
                    variant="outlined"
                    multiline
                    fullWidth
                    required
                />
                <Button type="submit" variant="contained">
                    Submit
                </Button>
            </Box>
        </Container>
    );
};

export default CreatePost;
