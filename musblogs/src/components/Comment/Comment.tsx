import React from "react";
import "./Comment.scss";
import "../../styles/buttons.scss";
import "../../styles/inputs.scss";
import "../../styles/names.scss";
import avatar from "../../images/user_toolkit/avatar.svg";
import { ImageDiv } from "../BasicComponents/ImageDiv/ImageDiv";
import { CommentProps } from "../../Types/DataBase";

export const Comment: React.FC<CommentProps> = ({...comment}) => {
    return (
        <div className="comment">
            <div className="user_info">
                <ImageDiv class="user_avatar" src={avatar} alt="avatar" />
                <div className="text_info">
                    <div>
                        <div className="post_header">{comment.user.firstname} {comment.user.lastname}</div>
                        <div className="login_name">{comment.user.login}</div>
                    </div>
                    <div className="login_name date">{comment.date}</div>
                </div>
            </div>
            <div className="comment_text">
                {comment.text}
            </div>
        </div>
    )
}