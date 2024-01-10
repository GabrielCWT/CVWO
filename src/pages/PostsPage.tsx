import Loading from "../components/Loading";
import Error from "../components/Error";
import Posts from "../components/Posts";
import { getAllPosts, getCategories, getPostByCategory } from "../scripts/apiHelpers";
import PostPreview from "../types/PostPreview";
import { Container, Select, SelectChangeEvent, MenuItem, FormControl, InputLabel } from "@mui/material";
import React, { Suspense, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PostsPage: React.FC = () => {
    const { category, postID } = useParams();
    const navigate = useNavigate();
    const [categoryOptions, setCategoryOptions] = useState<string[]>(["All Posts"]);
    const [hasError, setError] = useState<boolean>(false);
    const [posts, setPosts] = useState<PostPreview[] | null>(null);
    useEffect(() => {
        getCategories()
            .then((categories) => setCategoryOptions([...categoryOptions, ...categories]))
            .catch(() => {
                setError(true);
            });
    }, []);
    useEffect(() => {
        if (!category) {
            getAllPosts()
                .then((posts) => setPosts(posts))
                .catch(() => {
                    setError(true);
                });
        } else if (!categoryOptions.includes(category)) {
            navigate("/posts");
        } else {
            getPostByCategory(category)
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
                    <Select
                        label="Category"
                        defaultValue={category && categoryOptions.includes(category) ? category : "All Posts"}
                        onChange={handleNavigate}
                    >
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
