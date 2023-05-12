import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProps, PostProps, CommentProps, FullUserProps, TokenProps } from "../../Types/DataBase";
import { infUser, infPosts, infComments } from "../infinity";

interface UserInfoState {
    user: FullUserProps,
    token: TokenProps,
    posts: Array<PostProps>,
    comments: Array<CommentProps>,
    likes: Array<PostProps>,
    isLoading: boolean,
    error: string
}

const initialState: UserInfoState = {
    user: infUser,
    token: {
        auth_token: ""
    },
    posts: infPosts,
    comments: infComments,
    likes: infPosts,
    isLoading: false,
    error: ""
}

export const userInfoSlice = createSlice({
    name: "user_info",
    initialState,
    reducers: {
        userInfoFetching(state) {
            state.isLoading = true
            state.error = ""
        },
        userInfoFetchingUser(state, action: PayloadAction<FullUserProps>) {
            state.user = {...action.payload}            
        },
        userInfoFetchingToken(state, action: PayloadAction<TokenProps>) {
            state.token = {...action.payload}            
        },
        userInfoFetchingPosts(state, action: PayloadAction<Array<PostProps>>) {
            state.posts = {...action.payload}            
        },
        userInfoFetchingComments(state, action: PayloadAction<Array<CommentProps>>) {
            state.comments = {...action.payload}            
        },
        userInfoFetchingLikes(state, action: PayloadAction<Array<PostProps>>) {
            state.likes = {...action.payload}            
        },
        userInfoFetchingSuccess(state) {
            state.isLoading = false
            state.error = ""
        },
        userInfoFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false
            state.error = action.payload
        },
        userInfoLogout(state) {
            state = {...initialState}
        }
    }
})

export default userInfoSlice.reducer;