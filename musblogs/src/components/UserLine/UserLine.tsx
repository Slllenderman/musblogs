import React from "react";
import "./UserLine.scss";
import "../../styles/names.scss";
import { userToolkit } from "../../images/images";
import { UserProps } from "../../Types/DataBase";
import { ImageDiv } from "../BasicComponents/BasicComponents";

export const UserLine: React.FC<UserProps> = ({...user}) => {
    return (
        <div className="user_line">
            <ImageDiv src={userToolkit.avatar} alt="avatar" class="user_avatar" />
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