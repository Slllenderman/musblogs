import React from "react";
import "./UserLine.scss";
import "../../styles/names.scss";
import { userToolkit } from "../../images/images";
import { UserProps } from "../../Types/DataBase";
import { ImageDiv } from "../BasicComponents/BasicComponents";
import { useNavigate } from "react-router-dom";

export const UserLine: React.FC<UserProps> = ({...user}) => {

    const navigate = useNavigate()

    const goToUser = (e: any) => {
        navigate('/user/' + user.id)
    }

    return (
        <div className="user_line" onClick={goToUser}>
            <ImageDiv src={userToolkit.avatar} alt="avatar" class="user_avatar" />
            <div>
                <div className="black_header">
                    {user.first_name} {user.last_name}
                </div>
                <div className="login_name">
                    {user.username}
                </div>
            </div>
        </div>
    )
}