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
        postFeedFetchingPosts(state, action: PayloadAction<Array<PostProps>>) {
            state.postFeed = [...action.payload]
        },
        postFeedFetchingSearch(state, action: PayloadAction<string>) {
            state.search = action.payload
        },
        postFeedFetchingSuccess(state) {
            state.isLoading = false;
            state.error = "";
        },
        postFeedDeletePost(state, action: PayloadAction<number>) {
            let index = state.postFeed.findIndex((element) => element.id === action.payload)
            if (index != -1) {
                let newPostFeed = [...state.postFeed.slice(0, index), ...state.postFeed.slice(index + 1)]
                state.postFeed = [...newPostFeed]
            }
        },
        postFeedFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export const { postFeedFetchingSearch, postFeedDeletePost } = postFeedSlice.actions;

export default postFeedSlice.reducer;

