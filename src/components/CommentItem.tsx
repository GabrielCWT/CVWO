import CommentType from "../types/CommentType";

import React from "react";
// import { Card, CardContent, Typography } from "@mui/material";

type Props = {
    comment: CommentType;
};

const CommentItem: React.FC<Props> = ({ comment }) => {
    return <div>{comment.author}</div>;
};

export default CommentItem;
