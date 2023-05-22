import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProps, FullPostProps, FullCommentProps, FullUserProps, TokenProps } from "../../Types/DataBase";
import { infUser, infPosts, infComments } from "../infinity";

interface UserInfoState {
    user: FullUserProps,
    token: TokenProps,
    posts: Array<FullPostProps>,
    comments: Array<FullCommentProps>,
    likes: Array<FullPostProps>,
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
            state.token.auth_token = action.payload.auth_token           
        },
        userInfoFetchingPosts(state, action: PayloadAction<Array<FullPostProps>>) {
            state.posts = {...action.payload}            
        },
        userInfoFetchingComments(state, action: PayloadAction<Array<FullCommentProps>>) {
            state.comments = {...action.payload}            
        },
        userInfoFetchingLikes(state, action: PayloadAction<Array<FullPostProps>>) {
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
            state.user = {...infUser}
            state.token.auth_token = ""
            state.posts = {...infPosts}
            state.comments = {...infComments}
            state.likes = {...infPosts}
            state.error = ""
            state.isLoading = false
        }
    }
})

export const {userInfoLogout, userInfoFetchingToken} = userInfoSlice.actions;

export default userInfoSlice.reducer;