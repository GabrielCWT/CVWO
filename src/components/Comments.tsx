import CommentType from "../types/CommentType";
import { Box, TextField, Typography } from "@mui/material";

import React from "react";
import CommentList from "./CommentList";
import axios from "axios";

type Props = {
    commentList: CommentType[];
};

const Comments: React.FC<Props> = ({ commentList }) => {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        try {
            await axios.post("http://localhost:8000/api/posts/add", data, { withCredentials: true });
        } catch (err) {
            // TODO handle error
        }
    };
    return (
        <Box id="comment-container" display="grid">
            <Typography component="h2" variant="h5">
                Comments
            </Typography>
            <Box component="form" sx={{ "& > :not(style)": { m: 1 }, display: "grid" }} onSubmit={handleSubmit}>
                <TextField id="title" name="title" label="Title" variant="standard" multiline required />
            </Box>
            <CommentList commentList={commentList} />
        </Box>
    );
};

export default Comments;
