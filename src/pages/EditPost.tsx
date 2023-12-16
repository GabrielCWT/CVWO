import { CurrentUserContext } from "../App";
import Error from "../components/Error";
import { getPostByID } from "../scripts/apiHelpers";
import PostType from "../types/PostType";
import { Navigate, useNavigate, useParams } from "react-router-dom";
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
import React, { useContext, useEffect } from "react";
import axios from "axios";

const categories = ["Technology", "Sports", "Politics", "Entertainment", "Science", "Health", "Gaming"];

const EditPost: React.FC = () => {
    const { currentUser } = useContext(CurrentUserContext);
    const [post, setPost] = React.useState<PostType | null>(null);
    const [hasError, setError] = React.useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = React.useState<string>(categories[0]);
    const [helperMessage, setHelperMessage] = React.useState<string>("");
    const { postID } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // TODO: check if user has permission to edit post
        const isAuthorised = true;
        if (isAuthorised && postID) {
            getPostByID(postID)
                .then((post) => {
                    setPost(post);
                    setSelectedCategory(post.Category);
                })
                .catch(() => {
                    setError(true);
                });
        } else {
            navigate("/");
        }
    }, []);

    const handleChange = (e: SelectChangeEvent) => {
        setSelectedCategory(e.target.value as string);
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        try {
            const res = await axios.put(`http://localhost:8000/api/posts/post/${post?.ID}`, data, {
                withCredentials: true,
            });
            const category = res.data.data.Category;
            const postID = res.data.data.ID;
            navigate(`/posts/${category}/${postID}`);
        } catch (err) {
            setHelperMessage("Error editing post");
        }
    };
    if (!currentUser.isSignedIn) {
        return <Navigate to="/login" />;
    }
    return (
        <Container>
            <h1>{"Create Post"}</h1>
            <Box component="form" sx={{ "& > :not(style)": { m: 1 }, display: "grid" }} onSubmit={handleSubmit}>
                {hasError ? (
                    <Error />
                ) : (
                    <>
                        <TextField
                            id="title"
                            name="title"
                            label="Title"
                            variant="standard"
                            defaultValue={post?.Title}
                            InputLabelProps={{ shrink: true }}
                            multiline
                            required
                        />
                        <FormControl fullWidth>
                            <InputLabel id="category-label">Category</InputLabel>
                            <Select
                                labelId="category"
                                id="category"
                                name="category"
                                label="Category"
                                value={selectedCategory}
                                defaultValue={post?.Category}
                                onChange={handleChange}
                                required
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
                            defaultValue={post?.Content}
                            InputLabelProps={{ shrink: true }}
                            multiline
                            fullWidth
                            required
                        />
                        <FormHelperText id="my-helper-text">{helperMessage}</FormHelperText>
                        <Button type="submit" variant="contained">
                            Submit
                        </Button>
                    </>
                )}
            </Box>
        </Container>
    );
};

export default EditPost;
