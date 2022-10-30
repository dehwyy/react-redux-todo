import React, {useEffect} from 'react';
import {addBackgroundStyle, addStyle, defaultStyle, useAppDispatch, useAppSelector} from "../bll/redux";
import PostsSelect from "./Posts__select";
import Post from "./Post";
import {getAllData} from "../bll/getData";
import {post} from "../ts/interfaces"

function Posts() {
    const posts = useAppSelector(state => state.posts.value)
    const dispatcher = useAppDispatch()
    const propogPlusDisp = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation()
        dispatcher({type: addBackgroundStyle})
        dispatcher({type: addStyle, payload: "modal1"})
    }
    useEffect(() => {
        getAllData(dispatcher)
    }, [])
    return (
        <div className={"posts-wrapper"} onClick={() => dispatcher({type: defaultStyle})}>
            <div className={"posts"}>
                <div className={"options"}>
                    <div className={"options__content"}>
                        <button
                            onClick={propogPlusDisp}
                            className={"btn"}>
                            Add post
                        </button>
                        <PostsSelect />
                    </div>
                </div>
                <div className={"posts__list"}>
                    {posts.map((post: post) => {
                    return (
                        <Post key={post.id} userId={post.userId}
                                  id={post.id}
                                  title={post.title}
                                  body={post.body}
                                  likes={post.likes}
                                  dislikes={post.dislikes}
                        />
                    )
                    })}
                </div>
            </div>
        </div>
    );
}

export default Posts;