import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProps, FullPostProps, FullCommentProps, FullUserProps, TokenProps, FullLikeProps, FullFollowerProps } from "../../Types/DataBase";
import { infUser, infPosts, infComments } from "../infinity";

interface UserInfoState {
    user: FullUserProps,
    token: TokenProps,
    posts: Array<FullPostProps>,
    comments: Array<FullCommentProps>,
    likes: Array<FullLikeProps>,
    subscribers: Array<FullFollowerProps>,
    subscriptions: Array<FullFollowerProps>,
    feedPosts: Array<FullPostProps>,
    isLoading: boolean,
    error: string
}

const initialState: UserInfoState = {
    user: infUser,
    token: { auth_token: "" },
    posts: [],
    comments: [],
    likes: [],
    subscribers: [],
    subscriptions: [],
    feedPosts: [],
    isLoading: false,
    error: "",
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
            state.posts = [...action.payload]
        },
        userInfoFetchingFeedPosts(state, action: PayloadAction<Array<FullPostProps>>) {
            state.feedPosts = [...action.payload]
        },
        userInfoFetchingAddFeedPosts(state, action: PayloadAction<Array<FullPostProps>>) {
            action.payload.map((elment: FullPostProps, numb: number) => {
                let index = state.feedPosts.findIndex((element) => element.id === elment.id)
                if (index === -1)
                    state.feedPosts.push(elment)
            })
        },
        userInfoFetchingClearFeedPosts(state) {
            state.feedPosts = []
        },
        userInfoFetchingSubscribers(state, action: PayloadAction<Array<FullFollowerProps>>) {
            state.subscribers = [...action.payload]            
        },
        userInfoFetchingSubscriptions(state, action: PayloadAction<Array<FullFollowerProps>>) {
            state.subscriptions = [...action.payload]            
        },
        userInfoFetchingComments(state, action: PayloadAction<Array<FullCommentProps>>) {
            state.comments = [...action.payload]
        },
        userInfoFetchingLikes(state, action: PayloadAction<Array<FullLikeProps>>) {
            state.likes = [...action.payload]
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
            state.posts = []
            state.comments = []
            state.likes = []
            state.error = ""
            state.subscribers = []
            state.subscriptions = []
            state.feedPosts = []
            state.isLoading = false
        }
    }
})

export const {userInfoLogout, userInfoFetchingToken, userInfoFetchingAddFeedPosts} = userInfoSlice.actions;

export default userInfoSlice.reducer;