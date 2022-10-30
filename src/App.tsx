import React from 'react';
import Navbar from "./components/Navbar";
import Posts from "./components/Posts";
import Sidebar from "./components/Sidebar";
import {PostsModal} from "./components/Posts__modal";
import {Route, Routes} from "react-router-dom";
import Wip from "./components/Wip";

function App() {
  return (
    <div className="App">
        <Navbar />
        <div className={"routes-wrapper"}>
            <Routes>
                <Route path={"/"} element={<Posts />} />
                <Route path={"/wip"} element={<Wip />} />
            </Routes>
            <Sidebar />
            <PostsModal />
        </div>
    </div>
  );
}

export default App;
