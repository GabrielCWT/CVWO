import BasicThreadList from "../components/BasicThreadList";
import { CurrentUserContext } from "../App";
import React, { useContext } from "react";

const Home: React.FC = () => {
    const { currentUser } = useContext(CurrentUserContext);
    return (
        <>
            {currentUser.isSignedIn && <h1>{`Welcome, ${currentUser.username}!`}</h1>}
            <h3>
                {"Welcome to CVWO's sample react app! Here's a basic list of forum threads for you to experiment with."}
            </h3>
            <br />
            <BasicThreadList />
        </>
    );
};

export default Home;
