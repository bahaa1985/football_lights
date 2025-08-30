import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice.js";
import timerMiddleware from "./timerMiddleware.js";

export const store = configureStore({
    reducer:{
       counter: counterReducer
    },
    middleware:
        (getDefaultMiddleware)=> getDefaultMiddleware().concat(timerMiddleware)
})