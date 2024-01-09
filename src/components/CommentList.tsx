import CommentItem from "./CommentItem";
import CommentType from "../types/CommentType";
import { Box, List, Typography } from "@mui/material";

import React from "react";

type Props = {
    commentList: CommentType[];
    postID: string;
};

const CommentList: React.FC<Props> = ({ commentList, postID }) => {
    return (
        <Box id="comment-list-container" display="grid">
            {commentList.length === 0 ? (
                <Typography component="p" variant="body1">
                    Be the first to comment!
                </Typography>
            ) : (
                <List>
                    {commentList.map((comment) => (
                        <CommentItem comment={comment} key={comment.ID} postID={postID} />
                    ))}
                </List>
            )}
        </Box>
    );
};

export default CommentList;
