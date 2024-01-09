import Link from "./Link";
import PostPreview from "../types/PostPreview";
import { Card, CardActionArea, CardActions, CardContent, Stack, Typography, Divider } from "@mui/material";
import React from "react";

interface Props {
    post: PostPreview;
}

const colors = {
    MainText: "#000000",
    CategoryOnHover: "#3c52b2",
    Posted: "#919191",
};

const PostCard: React.FC<Props> = ({ post }) => {
    const postDate = new Date(post.CreatedAt);
    const formattedDate = `${postDate.getMonth() + 1}/${postDate.getDate()}/${postDate.getFullYear()}`;
    const formattedTime = `${postDate.getHours()}:${postDate.getMinutes()}`;
    return (
        <>
            <Card sx={{ boxShadow: "none", marginBlock: 1 }}>
                <CardActionArea sx={{ paddingBlock: 1 }}>
                    <Link to={`/posts/${post.Category}/${post.ID}`} sx={{ color: colors.MainText }}>
                        <CardActions sx={{ paddingBlock: 0 }}>
                            <Stack direction="row" spacing={1} useFlexGap>
                                <Link to={`/posts/${post.Category}`}>
                                    <Typography
                                        variant="subtitle1"
                                        component="span"
                                        sx={{
                                            "&:hover": {
                                                color: colors.CategoryOnHover,
                                            },
                                        }}
                                    >
                                        {post.Category}
                                    </Typography>
                                </Link>
                                <Typography variant="subtitle1" component="span" sx={{ color: colors.Posted }}>
                                    •
                                </Typography>
                                <Typography variant="subtitle1" component="span" sx={{ color: colors.Posted }}>
                                    Posted on {formattedDate} at {formattedTime}
                                </Typography>
                            </Stack>
                        </CardActions>
                        <CardContent sx={{ padding: 1, paddingBlock: 0, "&:last-child": { paddingBottom: 0 } }}>
                            <Typography variant="h6" component="header" fontWeight="600">
                                {post.Title}
                            </Typography>
                            <Typography variant="subtitle2" component="p">
                                Written By: {post.Username}
                            </Typography>
                        </CardContent>
                    </Link>
                </CardActionArea>
            </Card>
            <Divider />
        </>
    );
};

export default PostCard;
