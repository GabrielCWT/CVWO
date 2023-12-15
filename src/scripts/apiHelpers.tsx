import axios from "axios";

export const getAllPosts = async () => {
    const res = await axios.get("http://localhost:8000/api/posts");
    return res.data.data;
};
