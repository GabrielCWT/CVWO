import { CurrentUserContext } from "../App";
import Error from "../components/Error";
import { getCategories } from "../scripts/apiHelpers";
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
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const CreatePost: React.FC = () => {
    const { currentUser } = useContext(CurrentUserContext);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [categoryOptions, setCategoryOptions] = useState<string[] | null>(null);
    const [helperMessage, setHelperMessage] = useState<string>("");
    const [hasError, setError] = useState<boolean>(false);
    const navigate = useNavigate();
    useEffect(() => {
        getCategories()
            .then((categories) => setCategoryOptions(categories))
            .catch(() => {
                setError(true);
            });
    }, []);

    const handleChange = (e: SelectChangeEvent) => {
        setSelectedCategory(e.target.value as string);
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/posts/add`, data, {
                withCredentials: true,
            });
            const category = res.data.Category;
            const postID = res.data.ID;
            navigate(`/posts/${category}/${postID}`);
        } catch (err) {
            setHelperMessage("Error creating post");
        }
    };
    if (!currentUser.isSignedIn) {
        return <Navigate to="/login" />;
    }

    if (categoryOptions === null || hasError) {
        return <Error />;
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
                        {categoryOptions.map((category) => (
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
