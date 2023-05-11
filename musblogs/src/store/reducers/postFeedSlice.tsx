import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostProps, CommentProps } from "../../Types/DataBase";
import { infPosts } from "../infinity";

interface postFeedState {
    postFeed: Array<PostProps>,
    isLoading: boolean,
    error: string,
    search: string
}

const initialState: postFeedState = {
    postFeed: [...infPosts],
    isLoading: false,
    error: "",
    search: ""
}

export const postFeedSlice = createSlice({
    name: "post_feed",
    initialState,
    reducers: {
        postFeedFetching(state) {
            state.isLoading = true;
            state.error = "";
        },
        postFeedFetchingSearch(state, action: PayloadAction<string>) {
            state.search = action.payload
        },
        postFeedFetchingSuccess(state) {
            state.isLoading = false;
            state.error = "";
        },
        postFeedFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

