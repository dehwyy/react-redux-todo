import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css"
import './styles/main-style.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {posts, selectChange, sidebar, style} from "./bll/redux";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = configureStore({reducer: {
    posts, style, selectChange, sidebar
    }, devTools: true, middleware: [thunk]})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

root.render(<BrowserRouter >
    <Provider store={store}>
        <App />
    </Provider>
</BrowserRouter> );

