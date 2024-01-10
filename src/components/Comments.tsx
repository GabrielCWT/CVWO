import CommentList from "./CommentList";
import CommentType from "../types/CommentType";
import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Props = {
    commentList: CommentType[];
    postID: string;
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
            <Typography component="h2" variant="h6">
                Comments
            </Typography>
            <Box component="form" sx={{ display: "flex", gap: "4px", alignItems: "end" }} onSubmit={handleSubmit}>
                <TextField
                    id="comment-content"
                    name="content"
                    label="Add a comment"
                    variant="standard"
                    multiline
                    required
                    sx={{ flexGrow: 1 }}
                />
                <Button type="submit" variant="contained" sx={{ height: 40 }}>
                    Submit
                </Button>
            </Box>
            <CommentList commentList={commentList} postID={postID} />
        </Box>
    );
};

export default Comments;
