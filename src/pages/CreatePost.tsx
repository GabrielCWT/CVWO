import { CurrentUserContext } from "../App";
import { Navigate, useNavigate } from "react-router-dom";
import {
    Box,
    Container,
    TextField,
    Button,
    Select,
    FormControl,
    InputLabel,
    MenuItem,
    FormHelperText,
    SelectChangeEvent,
} from "@mui/material";
import React, { useContext } from "react";
import axios from "axios";

const categories = ["Technology", "Sports", "Politics", "Entertainment", "Science", "Health", "Gaming"];

const CreatePost: React.FC = () => {
    const { currentUser } = useContext(CurrentUserContext);
    const [selectedCategory, setSelectedCategory] = React.useState<string>(categories[0]);
    const [helperMessage, setHelperMessage] = React.useState<string>("");
    const navigate = useNavigate();

    const handleChange = (e: SelectChangeEvent) => {
        setSelectedCategory(e.target.value as string);
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        try {
            const res = await axios.post("http://localhost:8000/api/posts/add", data, { withCredentials: true });
            const category = res.data.data.Category;
            const postID = res.data.data.ID;
            navigate(`/posts/${category}/${postID}`);
        } catch (err) {
            setHelperMessage("Error creating post");
        }
    };
    if (!currentUser.isSignedIn) {
        return <Navigate to="/login" />;
    }
    return (
        <Container>
            <h1>{"Create Post"}</h1>
            <Box component="form" sx={{ "& > :not(style)": { m: 1 }, display: "grid" }} onSubmit={handleSubmit}>
                <TextField id="title" name="title" label="Title" variant="standard" required autoFocus />
                <FormControl fullWidth>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                        labelId="category"
                        id="category"
                        name="category"
                        label="Category"
                        value={selectedCategory}
                        onChange={handleChange}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    id="content"
                    name="content"
                    label="Content"
                    variant="outlined"
                    multiline
                    fullWidth
                    required
                />
                <FormHelperText id="my-helper-text">{helperMessage}</FormHelperText>
                <Button type="submit" variant="contained">
                    Submit
                </Button>
            </Box>
        </Container>
    );
};

export default CreatePost;
