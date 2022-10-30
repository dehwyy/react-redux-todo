import React from 'react';
import {changer, sortPosts, useAppDispatch, useAppSelector} from "../bll/redux";
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";

const PostsSelect = () => {
    const dispatcher = useAppDispatch()
    const modal = useAppSelector(state => state.selectChange.value)
    const selected = useAppSelector(state => state.posts.sortType)
    const setDispatch = (myType: ActionCreatorWithPayload<string>) => {
        return function myDispatcher<T>(payload: T): void {
            dispatcher({type: myType, payload: payload })
        }
    }
    const sortArray = useAppSelector(state => state.posts.sortArray)
    const postsSort = setDispatch(sortPosts)
    const mouseEvents = setDispatch(changer)
    let statement = false
    return (
        <div onMouseOver={() => {
            mouseEvents("display-block")
            statement = false
        }}
             onMouseLeave={() => {
                 statement = true
                 new Promise(resolve => {
                     setTimeout(() => {
                         resolve("")
                     }, 300)
                 }).then(() => {
                     if (statement) mouseEvents("display-none")

                 })
             }}
             className={"options__content-select"}>
            <div style={{fontWeight: "600"}} className={"btn options__content-select-text"}>Sort by:</div>
            <div className={"options__content-select-modal " + modal}>
                {sortArray.map(sortItem => {
                    return <div
                        onClick={() => {
                            postsSort(sortItem.value)
                            mouseEvents("display-none")
                            }
                        }
                        style={sortItem.value === selected ? {background: "blueviolet", color: "white"} : {}} className={"options__content-select-modal__item"} id={sortItem.value} key={sortItem.keyword}>{sortItem.text}</div>
                })}
            </div>
        </div>
    );
};

export default PostsSelect;