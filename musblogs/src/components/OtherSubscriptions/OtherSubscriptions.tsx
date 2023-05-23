import React, { useState, useEffect } from "react";
import "./OtherSubscriptions.scss";
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
import { Button } from "../BasicComponents/BasicComponents";

export const OtherSubscriptions: React.FC = () => {

    const { id } = useParams();
    const cookies = new Cookies();
    const navigate = useNavigate();
    const {user, token} = useAppSelector((state) => state.userInfoReducer)
    const [subscriptions, setSubscriptions] = useState<Array<FullFollowerProps>>([])

    useEffect(() => {
        if (!cookies.get('auth_token')) 
            navigate('/login')
        else {
            axios.get(fullFollowersUrl + "?user_id=" + id)
            .then((response) => {
                setSubscriptions([...response.data])
            })
        }
    }, [user, token])

    const goToUser = (e: any) => {
        navigate('/user/' + id)
    }

    return (
        <div className="feed">
            <GoBackLine  onClickFunction={goToUser} />
            <div className="subscriptions">
                <div className="subs_info black_big_header">
                    Подписки ({subscriptions.length})
                </div>
                <div className="users">
                    {subscriptions.map((sub: FullFollowerProps, index: number) => {
                        return (
                            <div className="subscription">
                                <UserLine {...sub.follower_id} key={index} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}