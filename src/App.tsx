import Home from "./pages/Home";
import StyledThreadView from "./pages/StyledThreadView";
import CreatePost from "./pages/CreatePost";
import Signup from "./pages/Signup";
import Layout from "./components/Layout";
import Login from "./pages/Login";
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
                setCurrentUser({ isSignedIn: true, username: res.data.data.username });
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
                                <Route path="test" element={<StyledThreadView />} />
                                <Route path="create" element={<CreatePost />} />
                                <Route path="signup" element={<Signup />} />
                                <Route path="login" element={<Login />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </CurrentUserContext.Provider>
            </ThemeProvider>
        </div>
    );
};

export default App;
