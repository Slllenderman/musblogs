import React from "react";
import "./Comment.scss";
import "../../styles/buttons.scss";
import "../../styles/inputs.scss";
import "../../styles/names.scss";
import { userToolkit } from "../../images/images";
import { ImageDiv } from "../BasicComponents/BasicComponents";
import { CommentProps, FullCommentProps } from "../../Types/DataBase";
import { GetDayOfDate, GetMonthOfDate, GetYearOfDate, GetTimeOfDate } from "../../validate/Validate";

export const Comment: React.FC<FullCommentProps> = ({...comment}) => {
    return (
        <div className="comment">
            <div className="user_info">
                <ImageDiv class="user_avatar" src={userToolkit.avatar} alt="avatar" />
                <div className="text_info">
                    <div>
                        <div className="post_header">{comment.user_id.first_name} {comment.user_id.last_name}</div>
                        <div className="login_name">{comment.user_id.username}</div>
                    </div>
                    <div className="login_name date">{GetDayOfDate(comment.date)} {GetMonthOfDate(comment.date)}, {GetYearOfDate(comment.date)} {GetTimeOfDate(comment.date)}</div>
                </div>
            </div>
            <div className="comment_text">
                {comment.content}
            </div>
        </div>
    )
}