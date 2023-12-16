import Loading from "../components/Loading";
import Error from "../components/Error";
import Posts from "../components/Posts";
import { getAllPosts, getPostByCategory, getPostByID } from "../scripts/apiHelpers";
import PostType from "../types/PostType";
import { Container, Select, SelectChangeEvent, MenuItem, FormControl, InputLabel } from "@mui/material";
import React, { Suspense, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const categoryOptions = [
    "All Posts",
    "Technology",
    "Sports",
    "Politics",
    "Entertainment",
    "Science",
    "Health",
    "Gaming",
];
const PostsPage: React.FC = () => {
    const { category, postID } = useParams();
    const navigate = useNavigate();
    // TODO backend should hold a list of categories
    // const [categoryOptions, setCategoryOptions] = useState<string[] | null>(null);
    const [hasError, setError] = useState<boolean>(false);
    const [posts, setPosts] = useState<PostType[] | null>(null);
    useEffect(() => {
        if (postID) {
            getPostByID(postID)
                .then((posts) => setPosts(posts))
                .catch(() => {
                    setError(true);
                });
        } else if (category) {
            getPostByCategory(category)
                .then((posts) => setPosts(posts))
                .catch(() => {
                    setError(true);
                });
        } else {
            getAllPosts()
                .then((posts) => setPosts(posts))
                .catch(() => {
                    setError(true);
                });
        }
    }, [category, postID]);

    const handleNavigate = (e: SelectChangeEvent) => {
        const value = e.target.value;
        if (value === "All Posts") {
            navigate("/posts");
        } else {
            navigate(`/posts/${e.target.value}`);
        }
    };
    return (
        <Container>
            <Suspense fallback={<Loading />}>
                <FormControl>
                    <InputLabel id="category-select-label">Category</InputLabel>
                    <Select label="Category" defaultValue={category ? category : "All Posts"} onChange={handleNavigate}>
                        {categoryOptions.map((category) => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {hasError ? <Error /> : posts ? <Posts data={posts} /> : <Loading />}
            </Suspense>
        </Container>
    );
};

export default PostsPage;
