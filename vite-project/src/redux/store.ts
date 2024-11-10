import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import candidateSlice from "./candidateSlice";

const store = configureStore({
    reducer:{
        user:userSlice.reducer,
        candidate:candidateSlice.reducer
    }
})

export default store