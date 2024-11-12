import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import candidateSlice from "./candidateSlice";
import { useDispatch, useSelector } from "react-redux";

const store = configureStore({
    reducer:{
        user:userSlice.reducer,
        candidate:candidateSlice.reducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()