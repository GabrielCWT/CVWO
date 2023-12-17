import CommentItem from "./CommentItem";
import CommentType from "../types/CommentType";
import { Box, List, Typography } from "@mui/material";

import React from "react";

type Props = {
    commentList: CommentType[];
};

const CommentList: React.FC<Props> = ({ commentList }) => {
    return (
        <Box id="comment-container" display="grid">
            {commentList.length === 0 ? (
                <Typography component="p" variant="h4">
                    Be the first to post!
                </Typography>
            ) : (
                <List>
                    {commentList.map((comment) => (
                        <CommentItem comment={comment} key={comment.ID} />
                    ))}
                </List>
            )}
        </Box>
    );
};

export default CommentList;
