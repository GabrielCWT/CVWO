import CommentType from "../types/CommentType";
import PostType from "../types/PostType";
import axios from "axios";

export const getAllPosts = async (): Promise<PostType[]> => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/posts`);
        return res.data;
    } catch (err) {
        throw new Error("Error fetching posts");
    }
};

export const getPostByCategory = async (category: string): Promise<PostType[]> => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/posts/${category}`);
        return res.data;
    } catch (err) {
        throw new Error("Error fetching posts by category");
    }
};

export const getPostByID = async (postID: string): Promise<PostType> => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/posts/post/${postID}`);
        return res.data;
    } catch (err) {
        throw new Error("Error fetching post by ID");
    }
};

export const getCommentsByPostID = async (postID: string, limit: number, offset: number): Promise<CommentType[]> => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/posts/post/${postID}/comment/comments`, {
            params: {
                limit,
                offset,
            },
        });
        return res.data;
    } catch (err) {
        throw new Error("Error fetching comments by post ID");
    }
};

export const getCategories = async (): Promise<string[]> => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/posts/categories`);
        return res.data;
    } catch (err) {
        throw new Error("Error fetching categories");
    }
};

export const deleteCommentByID = async (postID: string, commentID: number): Promise<void> => {
    try {
        await axios.delete(
            `${process.env.REACT_APP_BACKEND_URL}/api/posts/post/${postID}/comment/comments/${commentID}`,
            {
                withCredentials: true,
            },
        );
    } catch (err) {
        throw new Error("Error deleting comment by ID");
    }
};
