import Loading from "../components/Loading";
import Error from "../components/Error";
import Post from "../components/Post";
import { getCommentsByPostID, getPostByID } from "../scripts/apiHelpers";
import { formatRelativeTime } from "../scripts/helperFunctions";

import Comments from "../components/Comments";
import PostType from "../types/PostType";
import CommentType from "../types/CommentType";
import { CurrentUserContext } from "../App";
import { Container } from "@mui/material";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostPage: React.FC = () => {
    const { currentUser } = useContext(CurrentUserContext);
    const { postID } = useParams() as { postID: string };
    const [hasError, setError] = useState<boolean>(false);
    const [isAuthorised, setIsAuthorised] = useState<boolean>(false);
    const [post, setPost] = useState<PostType | null>(null);
    const [commentList, setCommentList] = useState<CommentType[] | null>(null);
    const [limit] = useState<number>(10);
    const [offset] = useState<number>(0); // TODO implement pagination
    useEffect(() => {
        if (postID) {
            getPostByID(postID)
                .then((post) => {
                    setPost(post);
                    if (post.Username == currentUser.username) {
                        setIsAuthorised(true);
                    }
                })
                .catch(() => {
                    setError(true);
                });
            getCommentsByPostID(postID, limit, offset)
                .then((commentList) => {
                    for (let i = 0; i < commentList.length; i++) {
                        commentList[i].CreatedAt = formatRelativeTime(new Date(commentList[i].CreatedAt));
                    }
                    setCommentList(commentList);
                })
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
                        <Comments commentList={commentList} postID={postID} />
                    </>
                ) : (
                    <Loading />
                )}
            </Suspense>
        </Container>
    );
};

export default PostPage;
