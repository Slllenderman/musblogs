import React, { useState, useEffect } from "react";
import "./Subscriptions.scss";
import "../../styles/buttons.scss";
import "../../styles/inputs.scss";
import "../../styles/names.scss";
import { UserLine } from "../UserLine/UserLine";
import { FullFollowerProps } from "../../Types/DataBase";
import { GoBackLine } from "../GoBackLine/GoBackLine";
import { Button } from "../BasicComponents/BasicComponents";
import Cookies from "universal-cookie";
import { useAppSelector, useAppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";
import { getOtherUserInfo } from "../../store/actions/getUserInfo";
import { UserBlock } from "./UserBlock/UserBlock";
import axios from "axios";
import { followersUrl } from "../../urls/bdUrls";

export const Subscriptions: React.FC = () => {

    const cookies = new Cookies();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {user, token, subscriptions} = useAppSelector((state) => state.userInfoReducer)

    useEffect(() => {
        if (!cookies.get('auth_token')) 
            navigate('/login')
        else {
            dispatch(getOtherUserInfo({login: cookies.get('username')}))
        }
    }, [user, token])

    const goToUserpage = (e: any) => {
        navigate('/userpage')
    }

    return (
        <div className="feed">
            <GoBackLine  onClickFunction={goToUserpage} />
            <div className="subscriptions">
                <div className="subs_info black_big_header">
                    Подписки ({subscriptions.length})
                </div>
                <div className="users">
                    {subscriptions.map((sub: FullFollowerProps, index: number) => {
                        return (
                            <UserBlock {...sub} key={index} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}