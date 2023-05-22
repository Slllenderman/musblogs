import { AppDispatch } from "..";
import axios from "axios";
import { userInfoSlice } from "../reducers/userInfoSlice";
import { TokenProps, PostProps, CommentProps, UserProps, FullUserProps } from "../../Types/DataBase";
import Cookies from "universal-cookie";
import { loginUrl, usersInfoUrl, tokenName, postsUrl, commentsUrl, likesUrl } from "../../urls/bdUrls";

type RegProps = {
    firstname: string,
    lastname: string,
    login: string,
    date: string,
    phone: string,
    email: string,
    password: string,
}

export const getOtherUserInfo = (props: {login: string}) => async (dispatch: AppDispatch) => {
    axios.get(postsUrl + "?username=" + props.login) // get posts
    .then((userPosts) => {
        if (userPosts.data[0])
            dispatch(userInfoSlice.actions.userInfoFetchingPosts(userPosts.data[0]))
    })
    .catch((error: any) => {
        dispatch(userInfoSlice.actions.userInfoFetchingError(error.message))    
    })

    axios.get(commentsUrl + "?username=" + props.login) // get comments
    .then((userComments) => {
        if (userComments.data[0])
            dispatch(userInfoSlice.actions.userInfoFetchingComments(userComments.data[0]))
    })
    .catch((error: any) => {
        dispatch(userInfoSlice.actions.userInfoFetchingError(error.message))    
    })

    axios.get(likesUrl + "?username=" + props.login) // get likes
    .then((userLikes) => {
        if (userLikes.data[0])
            dispatch(userInfoSlice.actions.userInfoFetchingLikes(userLikes.data[0]))
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
            dispatch(userInfoSlice.actions.userInfoFetchingUser(userResponse.data[0]))
            //getOtherUserInfo({login: loginProps.login})
        })
        dispatch(userInfoSlice.actions.userInfoFetchingToken(response.data))
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
        //getOtherUserInfo({login: cookiesProps.login})
    })
    dispatch(userInfoSlice.actions.userInfoFetchingToken(cookiesProps.token))
    dispatch(userInfoSlice.actions.userInfoFetchingSuccess())
}

export const registration = (regProps: RegProps) => async (dispatch: AppDispatch) => {
    dispatch(userInfoSlice.actions.userInfoFetching())
    axios.post('', {...regProps}) // create user
    .then((response) => {
        axios.post('', {login: regProps.login, password: regProps.password}) // create token
        .then((tokenResponse) => {
            dispatch(userInfoSlice.actions.userInfoFetchingToken(tokenResponse.data))
            dispatch(userInfoSlice.actions.userInfoFetchingSuccess())
        })
    })
    .catch((error: any) => {
        dispatch(userInfoSlice.actions.userInfoFetchingError(error.message))        
    })
}

export const logout = () => async (dispatch: AppDispatch) => {
    dispatch(userInfoSlice.actions.userInfoLogout())
}