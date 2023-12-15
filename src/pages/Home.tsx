import PostType from "../types/PostType";
import { getAllPosts } from "../scripts/apiHelpers";
import BasicThreadList from "../components/BasicThreadList";
import Posts from "../components/Posts";
import { CurrentUserContext } from "../App";
import React, { useContext, useEffect } from "react";

const Home: React.FC = () => {
    const [data, setData] = React.useState<PostType[]>([]);
    useEffect(() => {
        getAllPosts().then((data) => setData(data));
        // getAllPosts().then((data) => console.log(data, typeof data));
    }, []);
    const { currentUser } = useContext(CurrentUserContext);
    return (
        <>
            {currentUser.isSignedIn && <h1>{`Welcome, ${currentUser.username}!`}</h1>}
            <h3>
                {"Welcome to CVWO's sample react app! Here's a basic list of forum threads for you to experiment with."}
            </h3>
            <br />
            <BasicThreadList />
            {data && <Posts data={data} />}
        </>
    );
};

export default Home;
