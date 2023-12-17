import Link from "./Link";
import PostPreview from "../types/PostPreview";
import { Divider, Grid, ListItem, Typography } from "@mui/material";
import React from "react";

interface Props {
    post: PostPreview;
}

const PostList: React.FC<Props> = ({ post }) => {
    const postDate = new Date(post.CreatedAt);
    const formattedDate = `${postDate.getMonth() + 1}/${postDate.getDate()}/${postDate.getFullYear()}`;
    const formattedTime = `${postDate.getHours()}:${postDate.getMinutes()}`;
    return (
        <>
            <ListItem sx={{ paddingBlock: "1.5rem", display: "grid", gap: 1 }}>
                <Grid container direction="column">
                    <Grid item display="flex" sx={{ alignItems: "center" }} gap={1}>
                        <Link to={`/posts/${post.Category}`}>{post.Category}</Link>
                        <Typography variant="subtitle2" component="span" sx={{ color: "gray" }}>
                            • Posted on {formattedDate} at {formattedTime}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle2" component="p">
                            Written By: {post.Username}
                        </Typography>
                    </Grid>
                </Grid>
                <Link to={`/posts/${post.Category}/${post.ID}`} sx={{ fontSize: "1.2rem" }}>
                    {post.Title}
                </Link>
            </ListItem>
            <Divider />
        </>
    );
};

export default PostList;
