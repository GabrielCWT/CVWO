import "../App.css";

import React from "react";
import { Link } from "react-router-dom";

const BasicThreadList: React.FC = () => {
    return (
        <div style={{ width: "25vw", margin: "auto", textAlign: "center" }}>
            <ul>
                <li>
                    <Link to="/test">{"Posts"}</Link>
                </li>
                <li>
                    <Link to="/create">{"Create"}</Link>
                </li>
                <li>
                    <Link to="/login">{"Login"}</Link>
                </li>
                <li>
                    <Link to="/signup">{"Signup"}</Link>
                </li>
            </ul>
        </div>
    );
};

export default BasicThreadList;
