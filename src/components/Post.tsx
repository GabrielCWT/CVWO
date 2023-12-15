import Link from "./Link";
import { Divider, ListItem } from "@mui/material";
import React from "react";

interface Props {
    post: PostType;
}

const Post: React.FC<Props> = ({ post }) => {
    console.log(post);
    return (
        <>
            <ListItem>
                <Link to={`/posts/${post.ID}`}>{post.Title}</Link>
            </ListItem>
            <Divider />
        </>
    );
};

export default Post;
