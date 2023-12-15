import axios from "axios";

export const getAllPosts = async () => {
    const res = await axios.get("http://localhost:8000/api/posts");
    return res.data.data;
};

export const getPostByCategory = async (category: string) => {
    const res = await axios.get(`http://localhost:8000/api/posts/${category}`);
    return res.data.data;
};

export const getPostByID = async (postID: string) => {
    const res = await axios.get(`http://localhost:8000/api/posts/post/${postID}`);
    return res.data.data;
};
