import {createSlice} from "@reduxjs/toolkit";
import {basePost, IsidebarData, Isort, Istyle, post} from "../ts/interfaces";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../index";

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
const postReducer = createSlice({
    name: "postsReducer",
    initialState: {
        value: [] as post[],
        copyValue: [] as post[],
        copyValueSecond: [] as post[],
        defaultSortArray: [] as post[],
        sortType: "default" as string,
        sortArray: [] as Isort[]
    },
    reducers: {
        pullFromServer: (state, payload) => {
            state.value = payload.payload
            state.copyValue = payload.payload
            state.defaultSortArray = payload.payload
        },
        setSortArray: (state) => {
            state.sortArray = [
                {keyword: "sortingByDefault", value: "default", text: "by default"},
                {keyword: "sortingByTitle", value: "title", text: "by title"},
                {keyword: "sortingByBody", value: "body", text: "by body"},
            ]
        },
        resetPosts: (state) => {
            state.value = state.copyValueSecond
        },
        searchChange: (state, action) => {
            let searchBy: string;
            if (!action.payload.by) {
                searchBy = "body"
            } else {
                searchBy = "title"
            }
            if (state.copyValueSecond.length === 0 || state.copyValue.length === state.value.length) {
                state.copyValueSecond = state.value
            }
            state.value = [...state.copyValue].filter(post => post[searchBy as keyof basePost].includes(action.payload.text))
            state.defaultSortArray = [...state.value]
        },
        sortPosts: (state, action) => {
            state.sortType = action.payload
            if (state.sortType === "default") state.value = state.defaultSortArray
            else state.value.sort((a, b) => -1 * a[state.sortType as keyof basePost].localeCompare(b[state.sortType as keyof basePost]))
            state.copyValue = [...state.copyValueSecond]
        },
        addPost: (state, payload) => {
            state.value.push(payload.payload)
            state.copyValue.push(payload.payload)
        },
        removePost: (state, payload) => {
            state.value.filter(post => post !== payload.payload)
        },
        likePost: (state, action) => {
            state.value = state.value.map((post: post) => {
                if (post.id !== action.payload) {
                    return post
                } else {
                    if (post.likes) {
                        return {...post, likes: post.likes + 1}
                    } else {
                        post =  {...post, likes: 1}
                        return post
                    }

                }
            })
        },
        dislikePost: (state, action) => {
            state.value = state.value.map((post: post) => {
                if (post.id !== action.payload) {
                    return post
                } else {
                    if (post.dislikes) {
                        return {...post, dislikes: post.dislikes + 1}
                    } else {
                        post =  {...post, dislikes: 1}
                        return post
                    }

                }
            })
        }
    }
})
const styleReducer = createSlice({
    name: "styleReducer",
    initialState: {
        modal1: [] as string[],
        modal2: [] as string[],
        background: [] as string[],
    },
    reducers: {
        addStyle: (state, action: Istyle) => {
            const modal = action.payload
            state[modal] = ["displayF"]
        },
        defaultStyle: (state, action: Istyle) => {
            state[action.payload] = []
        },
        addBackgroundStyle: (state) => {
            state.background = ["modal-window", "displayF"]
        }
    }

})
const selectReducer = createSlice({
    name: "selectReducer",
    initialState: {
        value: "display-none"
    },
    reducers: {
        changer: (state, action) => {
            state.value = action.payload
        }
    }
})
const sidebarReducer = createSlice({
    name: "sidebarReducer",
    initialState: {
        data: [] as  IsidebarData[]
    },
    reducers: {
        setSidebarData: (state, action) => {
            state.data = action.payload
        }
    }

})

export const {setSidebarData} = sidebarReducer.actions
export const sidebar = sidebarReducer.reducer

export const {changer} = selectReducer.actions
export const selectChange = selectReducer.reducer

export const {addStyle, defaultStyle, addBackgroundStyle} = styleReducer.actions
export const style = styleReducer.reducer

export const {pullFromServer, sortPosts,  addPost, searchChange, likePost, dislikePost, resetPosts, setSortArray} = postReducer.actions
export const posts =  postReducer.reducer