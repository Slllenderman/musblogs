import React, { useState, useEffect } from "react";
import "./Subscribers.scss";
import "../../styles/buttons.scss";
import "../../styles/inputs.scss";
import "../../styles/names.scss";
import { GoBackLine } from "../GoBackLine/GoBackLine";
import { FullFollowerProps } from "../../Types/DataBase";
import { UserLine } from "../UserLine/UserLine";
import Cookies from "universal-cookie";
import { useAppSelector, useAppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";
import { getOtherUserInfo } from "../../store/actions/getUserInfo";

export const Subscribers: React.FC = () => {

    const cookies = new Cookies();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {user, token, subscribers} = useAppSelector((state) => state.userInfoReducer)

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
            <GoBackLine onClickFunction={goToUserpage} />
            <div className="subscribers">
                <div className="subs_info black_big_header">
                    Подписчики ({subscribers.length})
                </div>
                <div className="users">
                    {subscribers.map((sub: FullFollowerProps, index: number) => {
                        return (
                            <UserLine {...sub.user_id} key={index} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}