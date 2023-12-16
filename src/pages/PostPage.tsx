import Loading from "../components/Loading";
import Error from "../components/Error";
import Post from "../components/Post";
import { getPostByID } from "../scripts/apiHelpers";
import PostType from "../types/PostType";
import { Container } from "@mui/material";
import React, { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostPage: React.FC = () => {
    const { postID } = useParams();
    const [hasError, setError] = useState<boolean>(false);
    const [isAuthorised, setIsAuthorised] = useState<boolean>(false); // TODO: check if user has permission to edit post
    const [post, setPost] = useState<PostType | null>(null);
    useEffect(() => {
        // TODO: check if user has permission to edit post
        setIsAuthorised(true);
        if (postID) {
            getPostByID(postID)
                .then((posts) => setPost(posts))
                .catch(() => {
                    setError(true);
                });
        } else {
            setError(true);
        }
    }, [postID]);

    return (
        <Container>
            <Suspense fallback={<Loading />}>
                {hasError ? <Error /> : post ? <Post data={post} isAuthorised={isAuthorised} /> : <Loading />}
            </Suspense>
        </Container>
    );
};

export default PostPage;
