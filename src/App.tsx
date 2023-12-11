import Home from "./pages/Home";
import StyledThreadView from "./pages/StyledThreadView";
import CreatePost from "./pages/CreatePost";
import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, orange } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: blue,
        secondary: orange,
    },
});

const App: React.FC = () => {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/test" element={<StyledThreadView />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/create" element={<CreatePost />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
};

export default App;
