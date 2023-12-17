import CommentType from "../types/CommentType";
import { ListItem, Typography } from "@mui/material";

import React from "react";

type Props = {
    comment: CommentType;
};

const CommentItem: React.FC<Props> = ({ comment }) => {
    return (
        <ListItem>
            <Typography variant="body1" component="p">
                {comment.Content}
            </Typography>
            <Typography variant="subtitle2" component="span">
                Written By: {comment.Username}
            </Typography>
        </ListItem>
    );
};

export default CommentItem;
