import { CurrentUserContext } from "../App";
import MultiSelect from "../components/Form/MultiSelect";
import { Navigate } from "react-router-dom";
import { Box, Container, TextField, Button } from "@mui/material";
import React, { useContext } from "react";

const categories = ["Technology", "Sports", "Politics", "Entertainment", "Science", "Health"];

const CreatePost: React.FC = () => {
    const { currentUser } = useContext(CurrentUserContext);
    if (currentUser.isSignedIn) {
        return <Navigate to="/login" />;
    }
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
