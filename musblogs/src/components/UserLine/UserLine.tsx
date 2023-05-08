import React from "react";
import "./UserLine.scss";
import "../../styles/names.scss";
import avatar from "../../images/user_toolkit/avatar.svg";
import { UserProps } from "../../Types/DataBase";
import { ImageDiv } from "../BasicComponents/ImageDiv/ImageDiv";

export const UserLine: React.FC<UserProps> = ({...user}) => {
    return (
        <div className="user_line">
            <ImageDiv src={avatar} alt="avatar" class="user_avatar" />
            <div>
                <div className="black_header">
                    {user.firstname} {user.lastname}
                </div>
                <div className="login_name">
                    {user.login}
                </div>
            </div>
        </div>
    )
}