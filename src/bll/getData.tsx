import {pullFromServer, setSidebarData, setSortArray} from "./redux";
import {AppDispatch} from "../index"

export const getAllData = (dispatcher: AppDispatch) => {
    fetch('https://jsonplaceholder.typicode.com/photos?_limit=35')
        .then(response => response.json())
        .then(json => dispatcher({type: setSidebarData, payload: json}))
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=15')
        .then(response => response.json())
        .then(json => dispatcher({type: pullFromServer, payload: json}))
    dispatcher({type: setSortArray})
}