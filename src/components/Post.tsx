import Link from "./Link";
import PostType from "../types/PostType";
import { Divider, ListItem } from "@mui/material";
import React from "react";

interface Props {
    post: PostType;
}

const Post: React.FC<Props> = ({ post }) => {
    return (
        <>
            <ListItem>
                <Link to={`/posts/${post.ID}`}>{post.Title}</Link>
                <Link to={`/posts/${post.Category}`}>{post.Category}</Link>
            </ListItem>
            <Divider />
        </>
    );
};

export default Post;
