import Link from "./Link";
import PostType from "../types/PostType";
import { Box, Typography } from "@mui/material";
import React from "react";

interface Props {
    data: PostType;
}

const Post: React.FC<Props> = ({ data }) => {
    return (
        <Box id="post-content">
            <Box>
                <Typography variant="h5" component="h1">
                    {data.Title}
                </Typography>
                <Link to={`/posts/${data.Category}`}>{data.Category}</Link>
                <Typography variant="subtitle2" component="h3">
                    Written By: {data.Username}
                </Typography>
            </Box>
            <Typography variant="body1" component="p">
                {data.Content}
            </Typography>
        </Box>
    );
};

export default Post;
