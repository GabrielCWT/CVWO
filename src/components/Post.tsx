import Link from "./Link";
import PostType from "../types/PostType";
import { Box, Typography } from "@mui/material";
import React from "react";

interface Props {
    data: PostType;
    isAuthorised: boolean;
}

const Post: React.FC<Props> = ({ data, isAuthorised }) => {
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
                {isAuthorised && <Link to={`/posts/${data.Category}/${data.ID}/edit`}>Edit Post</Link>}
            </Box>
            <Typography variant="body1" component="p">
                {data.Content}
            </Typography>
        </Box>
    );
};

export default Post;
