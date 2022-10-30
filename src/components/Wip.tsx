import React from 'react';
import {NavLink} from "react-router-dom";

const Wip = () => {
    return (
        <div className={"while-ip"}>
            <div className={"while-ip-window"}>this page is still in progress....</div>
            <NavLink  to={"/"}><div style={{color: "gold"}} className={"while-ip-window"}>get back to the main page</div></NavLink>
        </div>
    );
};

export default Wip;