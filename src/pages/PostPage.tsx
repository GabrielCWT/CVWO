import Loading from "../components/Loading";
import Error from "../components/Error";
import Post from "../components/Post";
import { getCommentsByPostID, getPostByID } from "../scripts/apiHelpers";

import Comments from "../components/Comments";
import PostType from "../types/PostType";
import CommentType from "../types/CommentType";
import { Container } from "@mui/material";
import React, { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostPage: React.FC = () => {
    const { postID } = useParams();
    const [hasError, setError] = useState<boolean>(false);
    const [isAuthorised, setIsAuthorised] = useState<boolean>(false); // TODO: check if user has permission to edit post
    const [post, setPost] = useState<PostType | null>(null);
    const [commentList, setCommentList] = useState<CommentType[] | null>(null);
    const [limit] = useState<number>(10);
    const [offset] = useState<number>(0); // TODO implement pagination
    useEffect(() => {
        // TODO: check if user has permission to edit post
        setIsAuthorised(true);
        if (postID) {
            getPostByID(postID)
                .then((posts) => setPost(posts))
                .catch(() => {
                    setError(true);
                });
            getCommentsByPostID(postID, limit, offset)
                .then((commentList) => setCommentList(commentList))
                .catch(() => {
                    setError(true);
                });
        } else {
            setError(true);
        }
    }, [postID]);

    return (
        <Container sx={{ display: "grid", gap: 6 }}>
            <Suspense fallback={<Loading />}>
                {hasError ? (
                    <Error />
                ) : post && commentList ? (
                    <>
                        <Post data={post} isAuthorised={isAuthorised} />
                        <Comments commentList={commentList} postID={post.ID} />
                    </>
                ) : (
                    <Loading />
                )}
            </Suspense>
        </Container>
    );
};

export default PostPage;
