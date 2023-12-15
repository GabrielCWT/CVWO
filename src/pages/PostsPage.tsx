// import Posts from "../components/Posts";
import Posts from "../components/Posts";
import { getAllPosts, getPostByCategory, getPostByID } from "../scripts/apiHelpers";
import PostType from "../types/PostType";
import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostsPage: React.FC = () => {
    const { category, postID } = useParams();
    const [posts, setPosts] = useState<PostType[] | null>(null);
    useEffect(() => {
        if (postID) {
            getPostByID(postID).then((posts) => {
                setPosts(posts);
            });
        } else if (category) {
            getPostByCategory(category).then((posts) => {
                setPosts(posts);
            });
        } else {
            getAllPosts().then((posts) => {
                setPosts(posts);
            });
        }
    }, [category, postID]);
    return <Container>{posts ? <Posts data={posts} /> : <p>Loading...</p>}</Container>;
};

export default PostsPage;
