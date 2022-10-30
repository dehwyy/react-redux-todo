import React from 'react';
import {useAppSelector} from "../bll/redux";
import {NavLink} from "react-router-dom";

const Sidebar = () => {
    const sidebarData = useAppSelector(state => state.sidebar.data)
    return (
        <div className={"sidebar"}>
            <div className="sidebar__wrapper">
                {sidebarData.map((sidebarItem) => {

                    const title = sidebarItem.title.length >= 40 ? sidebarItem.title.slice(0, 40) + "..." : sidebarItem.title
                    return <NavLink to={"/wip"}><div className={"sidebar__wrapper__item"} key={sidebarItem.id}>
                        <div className={"sidebar__wrapper__item-img"}><img alt="photo.png" src={sidebarItem.url}/></div>
                        <div className={"sidebar__wrapper__item-texts"}>
                            <div className={"sidebar__wrapper__item-texts-title"}>
                                <span className={"sidebar__wrapper__item-texts-id"}>{sidebarItem.id}</span>
                                {title}
                            </div>
                        </div>
                    </div></NavLink>
                })}
            </div>
        </div>
    );
};

export default Sidebar;