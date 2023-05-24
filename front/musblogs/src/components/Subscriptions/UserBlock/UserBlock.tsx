import React from "react";
import "./UserBlock.scss"

import { UserLine } from "../../UserLine/UserLine";
import { Button } from "../../BasicComponents/BasicComponents";
import { FullFollowerProps } from "../../../Types/DataBase";
import { useAppDispatch } from "../../../store";
import { getOtherUserInfo } from "../../../store/actions/getUserInfo";
import Cookies from "universal-cookie";
import axios from "axios";
import { followersUrl, tokenName } from "../../../urls/bdUrls";

export const UserBlock: React.FC<FullFollowerProps> = ({...sub}) => {

    const cookies = new Cookies()
    const dispatch = useAppDispatch()

    const deleteSubscriptions = (e: any) => {
        if (cookies.get('auth_token')) {
            axios.delete(followersUrl + sub.id + "/", {headers: {
                'Content-Type': 'application/json',
                'Authorization': tokenName + ' ' + cookies.get("auth_token"),
            }})
            .then((response) => {
                dispatch(getOtherUserInfo({login: cookies.get('username')}))
            })
            .catch((error: any) => {
                console.log(error)
            })
        }
    }

    return (
        <div className="subscription">
            <UserLine {...sub.follower_id}/>
            <Button text="Отписаться" class="basic_button" onClickFunction={deleteSubscriptions}/>
        </div>
    )
}