import React, { useState, useEffect } from "react";
import "./OtherSubscribers.scss";
import "../../styles/buttons.scss";
import "../../styles/inputs.scss";
import "../../styles/names.scss";
import { GoBackLine } from "../GoBackLine/GoBackLine";
import { FullFollowerProps } from "../../Types/DataBase";
import { UserLine } from "../UserLine/UserLine";
import Cookies from "universal-cookie";
import { useAppSelector } from "../../store";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { fullFollowersUrl } from "../../urls/bdUrls";

export const OtherSubscribers: React.FC = () => {

    const { id } = useParams();
    const cookies = new Cookies();
    const navigate = useNavigate();
    const {user, token} = useAppSelector((state) => state.userInfoReducer)
    const [subscribers, setSubscribers] = useState<Array<FullFollowerProps>>([])

    useEffect(() => {
        if (!cookies.get('auth_token')) 
            navigate('/login')
        else {
            axios.get(fullFollowersUrl + "?follower_id=" + id)
            .then((response) => {
                setSubscribers([...response.data])
            })
        }
    }, [user, token])

    const goToUser = (e: any) => {
        navigate('/user/' + id)
    }

    return (
        <div className="feed">
            <GoBackLine onClickFunction={goToUser} />
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