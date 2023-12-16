import Loading from "../components/Loading";
import Error from "../components/Error";
import Posts from "../components/Posts";
import { getAllPosts, getPostByCategory, getPostByID } from "../scripts/apiHelpers";
import PostType from "../types/PostType";
import { Container } from "@mui/material";
import React, { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostsPage: React.FC = () => {
    const { category, postID } = useParams();
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
    return (
        <Container>
            <Suspense fallback={<Loading />}>
                {hasError ? <Error /> : posts ? <Posts data={posts} /> : <Loading />}
            </Suspense>
        </Container>
    );
};

export default PostsPage;
