import Link from "./Link";
import PostType from "../types/PostType";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import React from "react";

interface Props {
    data: PostType;
    isAuthorised: boolean;
}

const Post: React.FC<Props> = ({ data, isAuthorised }) => {
    const navigate = useNavigate();
    return (
        <Box id="post-content">
            <Box>
                <Link to={`/posts/${data.Category}`}>{data.Category}</Link>
                <Typography variant="subtitle2" component="h3">
                    Written By: {data.Username}
                </Typography>
                <Box display="flex" alignItems="center" justifyContent="space-between" paddingBottom={2}>
                    <Typography variant="h5" component="h1" fontWeight="600">
                        {data.Title}
                    </Typography>
                    {isAuthorised && (
                        <Button variant="contained" onClick={() => navigate(`/posts/${data.Category}/${data.ID}/edit`)}>
                            Edit Post
                        </Button>
                    )}
                </Box>
            </Box>
            <Typography variant="body1" component="p">
                {data.Content}
            </Typography>
        </Box>
    );
};

export default Post;
