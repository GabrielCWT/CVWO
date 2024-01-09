import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Signup from "./pages/Signup";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import PostsPage from "./pages/PostsPage";
import EditPost from "./pages/EditPost";
import PostPage from "./pages/PostPage";
import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, orange } from "@mui/material/colors";
import axios from "axios";

type CurrentUser = {
    isSignedIn: boolean;
    username: string;
};

type CurrentUserContextType = {
    currentUser: CurrentUser;
    setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser>>;
};

const theme = createTheme({
    palette: {
        primary: blue,
        secondary: orange,
    },
});

export const CurrentUserContext = createContext<CurrentUserContextType>({
    currentUser: { isSignedIn: false, username: "" },
    setCurrentUser: () => {},
});

const App: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<CurrentUser>({ isSignedIn: false, username: "" });
    useEffect(() => {
        console.log("checking auth");
        axios
            .get("http://localhost:8000/auth/verify", { withCredentials: true })
            .then((res) => {
                setCurrentUser({ isSignedIn: true, username: res.data.username });
            })
            .catch(() => {});
    }, []);
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index element={<Home />} />
                                <Route path="posts/:category?/" element={<PostsPage />} />
                                <Route path="posts/:category/:postID" element={<PostPage />} />
                                <Route path="posts/:category/:postID/edit" element={<EditPost />} />
                                <Route path="posts/create" element={<CreatePost />} />
                                <Route path="signup" element={<Signup />} />
                                <Route path="login" element={<Login />} />
                                <Route path="logout" element={<Logout />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </CurrentUserContext.Provider>
            </ThemeProvider>
        </div>
    );
};

export default App;
