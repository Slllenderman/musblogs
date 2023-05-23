import React, { useState, useEffect } from "react";
import "./MainPage.scss";
import "../../styles/buttons.scss";
import "../../styles/inputs.scss";
import "../../styles/names.scss";
import { Post } from "../Post/Post";
import { FullPostProps } from "../../Types/DataBase";
import { infPosts } from "../../store/infinity";
import { useAppSelector, useAppDispatch } from "../../store";
import { getFeedPosts, getOtherUserInfo } from "../../store/actions/getUserInfo";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

export const MainPage: React.FC = () => {

    const dispatch = useAppDispatch();
    const cookies = new Cookies();
    const navigate = useNavigate();
    const {user, token, feedPosts, subscribers, subscriptions} = useAppSelector((state) => state.userInfoReducer)

    useEffect(() => {
        if (!cookies.get("auth_token"))
            navigate("/login")
        else {
            dispatch(getOtherUserInfo({login: cookies.get("username")}))
        }
    }, [user, token])

    return (
        <div className="feed">
            <div className="top_shadow"></div>
            <div className="feed_content">
                <div className="pink_header">
                    Ваша лента
                </div>
                <div className="posts">
                    {feedPosts.map((post: FullPostProps, index: number) => {
                        return (
                            <Post {...post} key={index} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}