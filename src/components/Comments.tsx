import CommentList from "./CommentList";
import CommentType from "../types/CommentType";
import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Props = {
    commentList: CommentType[];
    postID: number;
};

const Comments: React.FC<Props> = ({ commentList, postID }) => {
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        try {
            await axios.post(`http://localhost:8000/api/posts/post/${postID}/comment/comments/add`, data, {
                withCredentials: true,
            });
            navigate(0);
        } catch (err) {
            // TODO handle error
        }
    };
    return (
        <Box id="comment-container" display="grid">
            <Typography component="h2" variant="h5">
                Comments
            </Typography>
            <Box component="form" sx={{ display: "grid", gap: "4px" }} onSubmit={handleSubmit}>
                <TextField id="comment-content" name="content" label="Comment" variant="standard" multiline required />
                <Button type="submit" variant="contained" sx={{ width: "100px", justifySelf: "flex-end" }}>
                    Submit
                </Button>
            </Box>
            <CommentList commentList={commentList} />
        </Box>
    );
};

export default Comments;
