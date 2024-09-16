import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import userInfoReducer from "./reducers/userInfoSlice";
import postFeedSlice from "./reducers/postFeedSlice";

const rootReducer = combineReducers({
    userInfoReducer,
    postFeedSlice
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;