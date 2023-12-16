import axios from "axios";

export const getAllPosts = async () => {
    try {
        const res = await axios.get("http://localhost:8000/api/posts");
        return res.data.data;
    } catch (err) {
        throw new Error("Error fetching posts");
    }
};

export const getPostByCategory = async (category: string) => {
    try {
        const res = await axios.get(`http://localhost:8000/api/posts/${category}`);
        return res.data.data;
    } catch (err) {
        throw new Error("Error fetching posts by category");
    }
};

export const getPostByID = async (postID: string) => {
    try {
        const res = await axios.get(`http://localhost:8000/api/posts/post/${postID}`);
        return res.data.data;
    } catch (err) {
        throw new Error("Error fetching post by ID");
    }
};
