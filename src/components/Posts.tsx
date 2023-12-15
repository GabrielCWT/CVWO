import Post from "./Post";
import PostType from "../types/PostType";
import { List } from "@mui/material";
import React from "react";

interface Props {
    data: PostType[];
}

const Posts: React.FC<Props> = ({ data }) => {
    return (
        <List>
            {data.map((post) => (
                <Post post={post} key={post.ID} />
            ))}
        </List>
    );
};

export default Posts;
