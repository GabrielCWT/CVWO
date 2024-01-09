// import PostList from "./PostList";
import PostCard from "./PostCard";
import PostPreview from "../types/PostPreview";
import { List, Typography } from "@mui/material";
import React from "react";

interface Props {
    data: PostPreview[];
}

const Posts: React.FC<Props> = ({ data }) => {
    if (data.length === 0) {
        return (
            <Typography component="p" variant="h4">
                Be the first to post!
            </Typography>
        );
    }
    return (
        <List>
            {data.map((post) => (
                // <PostList post={post} key={post.ID} />
                <PostCard post={post} key={post.ID} />
            ))}
        </List>
    );
};

export default Posts;
