import PostPreview from "../types/PostPreview";
import { getAllPosts } from "../scripts/apiHelpers";
import Posts from "../components/Posts";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { CurrentUserContext } from "../App";
import React, { Suspense, useContext, useEffect } from "react";
import { Container } from "@mui/material";

const Home: React.FC = () => {
    const [posts, setPosts] = React.useState<PostPreview[] | null>(null);
    const [hasError, setError] = React.useState<boolean>(false);
    useEffect(() => {
        getAllPosts()
            .then((posts) => setPosts(posts))
            .catch(() => setError(true));
    }, []);
    const { currentUser } = useContext(CurrentUserContext);
    return (
        <Container>
            {currentUser.isSignedIn && <h1>{`Welcome, ${currentUser.username}!`}</h1>}
            <h3>
                {"Welcome to CVWO's sample react app! Here's a basic list of forum threads for you to experiment with."}
            </h3>
            <br />

            <Suspense fallback={<Loading />}>
                {hasError ? <Error /> : posts ? <Posts data={posts} /> : <Loading />}
            </Suspense>
        </Container>
    );
};

export default Home;
