import React, {useRef} from 'react';
import {resetPosts, searchChange, useAppDispatch} from "../bll/redux";
import {NavLink} from "react-router-dom";

const Navbar = () => {
    const ref = useRef<HTMLInputElement>(null)
    const checkRef = useRef<HTMLInputElement>(null)
    const dispatcher = useAppDispatch()
    const checkboxF = () => {
        if (ref.current!.value) {
            ref.current!.value = ''
            dispatcher({type: resetPosts})
        }
    }
    return (
        <div className={"navbar"}>
            <div className={"navbar__search"}>
                <div style={{display: "flex"}}>
                    <div className={"navbar__search__text"}>
                        Search:
                    </div>
                    <div className="switch">
                        <label>
                            by body
                            <input onChange={checkboxF} ref={checkRef} type="checkbox" />
                            <span className="lever"></span>
                            by title
                        </label>
                    </div>
                </div>
                <div id="search-input" className="input-field col s6 my-input">
                    <input
                        onChange={() => dispatcher({type: searchChange, payload:
                                {by: checkRef.current!.checked ? 123: null,
                                    text: ref.current!.value}})}
                        ref={ref} style={{fontSize: "25px"}} placeholder="Add body" id="email" type="text" className="validate" />
                    <i
                        onClick={() => ref.current!.focus()}
                        style={{fontSize: "2.5rem"}} id="search" className="material-icons">search</i>
                </div>
                <div className={"navbar__nav"}>
                    <NavLink to={"/"}><div className={"navbar__nav-main"}>Main Page</div></NavLink>
                </div>
            </div>
        </div>
    );
};

export default Navbar;