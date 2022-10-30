import React, {useRef} from 'react';
import {addPost, addStyle, defaultStyle, sortPosts, useAppDispatch, useAppSelector} from "../bll/redux";

export const PostsModal = () => {
    const dispatcher = useAppDispatch()
    const styles1 = useAppSelector(state => state.style.modal1)
    const styles2 = useAppSelector(state => state.style.modal2)
    const sortType = useAppSelector(state => state.posts.sortType)
    const backgroundStyle = useAppSelector(state => state.style.background)
    const title = useRef<HTMLInputElement>(null)
    const body = useRef<HTMLInputElement>(null)
    const addPostF = () => {
        if (title.current && body.current) {
            dispatcher({type: addPost, payload: {
                    userId: Math.floor(Math.random() * 10),
                    id: Date.now(),
                    title: title.current.value,
                    body: body.current.value
                }})
            title.current.value = ''
            body.current.value = ''
            removeALlModals()
        }
    }
    const addPostFS = () => {
        addPostF()
        dispatcher({
            type: sortPosts})
        removeALlModals()
        if (title.current && body.current) {
            title.current.value = ''
            body.current.value = ''
        }
    }
    const addPostQ = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.stopPropagation()
        dispatcher({type: defaultStyle, payload: "modal1"})
        dispatcher({type: addStyle, payload: "modal2"})
    }

    const removeALlModals = () => {
        dispatcher({type: defaultStyle, payload: "modal1"})
        dispatcher({type: defaultStyle, payload: "modal2"})
        dispatcher({type: defaultStyle, payload: "background"})
        if (title.current && body.current) {
            title.current.value = ''
            body.current.value = ''
        }
    }

    return (
        <div>
            <div onClick={removeALlModals} className={backgroundStyle.join(" ")}>
                <div onClick={event => event.stopPropagation()} className={"modal-window__content " + styles1.join(' ')}>
                    <i  onClick={removeALlModals}
                        className="material-icons absolute-icon">
                        close
                    </i>
                    <p style={{textAlign: "center", fontSize: '35px', margin: "0 0 -5px 0"}}>Add post</p>
                    <div className="input-field col s6 my-input">
                        <input ref={title} style={{fontSize: "30px"}} placeholder="Add title" id="email" type="email" className="validate" />
                    </div>
                    <div className="input-field col s6 my-input">
                        <input ref={body} style={{fontSize: "30px", margin: "10px 0 50px 0"}} placeholder="Add body" id="email" type="email" className="validate" />
                    </div>
                    <button onClick={addPostQ}
                            className="waves-effect waves-light btn" >
                            ADD
                    </button>
                </div>

                <div onClick={event => event.stopPropagation()} className={"modal-window__content modal-window__content-tw " + styles2.join(' ')}>
                    <p style={{textAlign: "center", fontSize: '35px', margin: "30px 0 -5px 0"}}>{sortType === "default" ?  "Add post?": "Re - sort posts?"}</p>
                    <div className={"btn-flex"}>
                        <button onClick={addPostF} className="waves-effect waves-light btn btn-tw" >{sortType === "default" ?  "Add": "Simply add"}</button>
                        {sortType === "default" ? <></> : <button onClick={addPostFS} className="waves-effect waves-light btn btw-tw">RE-SORT</button>}
                        <button onClick={removeALlModals} className="waves-effect waves-light btn btw-tw" >CANCEL</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
