import React, {FC, memo} from 'react';
import {dislikePost, likePost, useAppDispatch} from "../bll/redux";
import {post} from "../ts/interfaces";


const Post: FC<post> = ({title, body, id, likes, dislikes}) => {
    const dispatcher = useAppDispatch()
    return (
        <div key={id} className={"post"}>
            <div className={"post__title"}>
                {title}
            </div>
            <div className={"post__body"}>
                {body}
            </div>
            <div className={"post__likes"}>
                <span style={{color: "green"}}><i onClick={() => dispatcher({type: likePost, payload: id})} className="material-icons">mood</i> {likes || "0"}</span>
                <span style={{color: "darkred"}}><i onClick={() => dispatcher({type: dislikePost, payload: id})} className="material-icons">mood_bad</i> {dislikes || "0"}</span>
            </div>
        </div>
    );
};

export default memo(Post);