import CommentType from "../types/CommentType";
import { Card, CardContent, Typography, Divider } from "@mui/material";

import React from "react";

type Props = {
    comment: CommentType;
};

const CommentItem: React.FC<Props> = ({ comment }) => {
    return (
        <>
            <Card square elevation={0} sx={{ paddingTop: 2 }}>
                <Typography sx={{ fontWeight: 600, fontSize: "0.8rem" }}>
                    {comment.Username} • {comment.CreatedAt}
                </Typography>
                <CardContent sx={{ padding: 0 }}>{comment.Content}</CardContent>
            </Card>
            <Divider />
        </>
    );
};

export default CommentItem;
