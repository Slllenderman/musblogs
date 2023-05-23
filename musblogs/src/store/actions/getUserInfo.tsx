import { AppDispatch } from "..";
import axios from "axios";
import { userInfoSlice } from "../reducers/userInfoSlice";
import { TokenProps, PostProps, CommentProps, UserProps, FullUserProps, FullFollowerProps, FullPostProps } from "../../Types/DataBase";
import Cookies from "universal-cookie";
import { loginUrl, usersInfoUrl, tokenName, createUserUrl, fullLikesUrl, fullCommentsUrl, fullPostsUrl, fullFollowersUrl } from "../../urls/bdUrls";

type RegProps = {
    username: string,
    email: string,
    password: string,
}

type EditProps = {
    username: string,
    email: string,
    first_name: string,
    last_name: string,
    birthday: string,
    phone: string
}

export const getFeedPosts = (props: {username: string, subscriptions: Array<FullFollowerProps>, subscribers: Array<FullFollowerProps>}) => async (dispatch: AppDispatch) => {
    getOtherUserInfo({login: props.username})
    let fullPosts: Array<FullPostProps> = []
    console.log(fullPostsUrl + "?username=" + props.username)
    axios.get(fullPostsUrl + "?username=" + props.username)
    .then((response) => {
        fullPosts = [...fullPosts, ...response.data]
        console.log(fullPosts)
    })
    props.subscriptions.map((sub: FullFollowerProps, index: number) => {
        console.log("subs " + fullPostsUrl + "?username=" + sub.user_id.id)
        axios.get(fullPostsUrl + "?username=" + sub.user_id.id)
        .then((response) => {
            fullPosts = [...fullPosts, ...response.data]
            console.log(fullPosts)
        })        
    })
    dispatch(userInfoSlice.actions.userInfoFetchingFeedPosts([...fullPosts]))
}

export const getOtherUserInfo = (props: {login: string}) => async (dispatch: AppDispatch) => {
    axios.get(fullFollowersUrl + "?username=" + props.login)
    .then((sResponse) => {
        dispatch(userInfoSlice.actions.userInfoFetchingSubscriptions([...sResponse.data]))
        dispatch(userInfoSlice.actions.userInfoFetchingClearFeedPosts())
        axios.get(fullPostsUrl + "?username=" + props.login)
        .then((response) => {
            dispatch(userInfoSlice.actions.userInfoFetchingAddFeedPosts([...response.data]))
        })
        sResponse.data.map((sub: FullFollowerProps, index: number) => {
            axios.get(fullPostsUrl + "?user_id=" + sub.follower_id.id)
            .then((response) => {
                dispatch(userInfoSlice.actions.userInfoFetchingAddFeedPosts([...response.data]))
            })        
        })
    })
    axios.get(fullFollowersUrl + "?f_username=" + props.login)
    .then((fResponse) => {
        dispatch(userInfoSlice.actions.userInfoFetchingSubscribers([...fResponse.data]))
    })
    axios.get(fullPostsUrl + "?username=" + props.login) // get posts
    .then((userPosts) => {
        dispatch(userInfoSlice.actions.userInfoFetchingPosts([]))
        dispatch(userInfoSlice.actions.userInfoFetchingPosts([...userPosts.data]))
    })
    .catch((error: any) => {
        dispatch(userInfoSlice.actions.userInfoFetchingError(error.message))    
    })
    axios.get(fullCommentsUrl + "?username=" + props.login) // get comments
    .then((userComments) => {
        dispatch(userInfoSlice.actions.userInfoFetchingComments([...userComments.data]))
    })
    .catch((error: any) => {
        dispatch(userInfoSlice.actions.userInfoFetchingError(error.message))    
    })
    axios.get(fullLikesUrl + "?username=" + props.login) // get likes
    .then((userLikes) => {
        if (userLikes.data)
            dispatch(userInfoSlice.actions.userInfoFetchingLikes([...userLikes.data]))
    })
    .catch((error: any) => {
        dispatch(userInfoSlice.actions.userInfoFetchingError(error.message))    
    })
}

export const login = (loginProps: {username: string, password: string}) => async (dispatch: AppDispatch) => {
    const cookies = new Cookies()
    dispatch(userInfoSlice.actions.userInfoFetching())
    axios.post(loginUrl, {...loginProps}) //add token
    .then((response) => {
        console.log(response)
        axios.get(usersInfoUrl + '?username=' + loginProps.username, {headers: {
            'Content-Type': 'application/json',
            'Authorization': tokenName + ' ' + response.data.auth_token,
        }}) // get full user info 
        .then((userResponse) => {
            console.log(userResponse)
            cookies.set('auth_token', response.data.auth_token, { path: '/' })
            cookies.set('username', loginProps.username, { path: '/' })
            getOtherUserInfo({login: loginProps.username})
            dispatch(userInfoSlice.actions.userInfoFetchingUser(userResponse.data[0]))
        })
        dispatch(userInfoSlice.actions.userInfoFetchingToken({...response.data}))
        dispatch(userInfoSlice.actions.userInfoFetchingSuccess())
    })
    .catch((error: any) => {
        console.log(error)
        console.log(error.message)
        dispatch(userInfoSlice.actions.userInfoFetchingError(error.message))
    })
}

export const putUser = (putProps: {newUserInfo: FullUserProps, token: string}) => async (dispatch: AppDispatch) => {
    axios.put(usersInfoUrl + putProps.newUserInfo.id + "/", {...putProps.newUserInfo}, {headers: {
        'Content-Type': 'application/json',
        'Authorization': tokenName + ' ' + putProps.token,
    }})
    .then((response) => {
        console.log('suucessful put')
        console.log(response)
        dispatch(userInfoSlice.actions.userInfoFetchingUser(response.data))
    })
    .catch((error: any) => {
        console.log(error)
        console.log(error.message)
        dispatch(userInfoSlice.actions.userInfoFetchingError(error.message))
    })
}

export const getCookies = (cookiesProps: {token: TokenProps, login: string}) => async (dispatch: AppDispatch) => {
    dispatch(userInfoSlice.actions.userInfoFetching())
    axios.get(usersInfoUrl + "?username=" + cookiesProps.login) // get full user info 
    .then((userResponse) => {
        dispatch(userInfoSlice.actions.userInfoFetchingUser(userResponse.data[0]))
        getOtherUserInfo({login: cookiesProps.login})
    })
    dispatch(userInfoSlice.actions.userInfoFetchingToken({...cookiesProps.token}))
    dispatch(userInfoSlice.actions.userInfoFetchingSuccess())
}

export const registration = (regProps: {reg: RegProps, edit: EditProps}) => async (dispatch: AppDispatch) => {
    const cookies = new Cookies()
    dispatch(userInfoSlice.actions.userInfoFetching())
    axios.post(createUserUrl, {...regProps.reg}) // create user
    .then((response) => {
        const userId = response.data.id
        axios.post(loginUrl, {username: regProps.reg.username, password: regProps.reg.password}) // create token
        .then((tokenResponse) => {
            dispatch(userInfoSlice.actions.userInfoFetchingToken({...tokenResponse.data}))
            cookies.set('auth_token', tokenResponse.data.auth_token, { path: '/' })
            cookies.set('username', regProps.reg.username, { path: '/' })
            axios.put(usersInfoUrl + userId + "/", {...regProps.edit}, {headers: {
                'Content-Type': 'application/json',
                'Authorization': tokenName + ' ' + tokenResponse.data.auth_token,
            }})
            .then((fullUserResponse) => {
                console.log('suucessful put')
                console.log(fullUserResponse)
                dispatch(userInfoSlice.actions.userInfoFetchingUser(fullUserResponse.data))
            }) 
            .catch((error: any) => {
                console.log(error)
            })     
        })
    })
    .catch((error: any) => {
        dispatch(userInfoSlice.actions.userInfoFetchingError(error.message))        
    })
}

export const logout = () => async (dispatch: AppDispatch) => {
    dispatch(userInfoSlice.actions.userInfoLogout())
}