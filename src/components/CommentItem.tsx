import CommentType from "../types/CommentType";
import { deleteCommentByID } from "../scripts/apiHelpers";
import { CurrentUserContext } from "../App";
import { Card, CardContent, Typography, Divider, Button, Box } from "@mui/material";

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
    comment: CommentType;
    postID: string;
};

const CommentItem: React.FC<Props> = ({ comment, postID }) => {
    const { currentUser } = useContext(CurrentUserContext);

    const navigate = useNavigate();
    const handleDelete = async () => {
        await deleteCommentByID(postID, comment.ID);
        navigate(0);
    };
    return (
        <>
            <Card square elevation={0} sx={{ paddingBlock: 2, display: "flex", justifyContent: "space-between" }}>
                <Box>
                    <Typography sx={{ fontWeight: 600, fontSize: "0.8rem" }}>
                        {comment.Username} • {comment.CreatedAt}
                    </Typography>
                    <CardContent sx={{ padding: 0, "&:last-child": { padding: 0 } }}>{comment.Content}</CardContent>
                </Box>
                {currentUser.username == comment.Username && <Button onClick={handleDelete}>Delete</Button>}
            </Card>
            <Divider />
        </>
    );
};

export default CommentItem;
