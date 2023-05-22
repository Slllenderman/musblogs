import React from "react";
import "./Comment.scss";
import "../../styles/buttons.scss";
import "../../styles/inputs.scss";
import "../../styles/names.scss";
import { userToolkit } from "../../images/images";
import { ImageDiv } from "../BasicComponents/BasicComponents";
import { CommentProps, FullCommentProps } from "../../Types/DataBase";
import { GetDayOfDate, GetMonthOfDate, GetYearOfDate, GetTimeOfDate } from "../../validate/Validate";
import { useNavigate } from "react-router-dom";

export const Comment: React.FC<FullCommentProps> = ({...comment}) => {

    const navigate = useNavigate();

    const goToUser = (e: any) => {
        navigate("/user/" + comment.user_id.id)
    }

    return (
        <div className="comment">
            <div className="user_info">
                <ImageDiv class="user_avatar" src={userToolkit.avatar} alt="avatar" onClickFunction={goToUser} />
                <div className="text_info">
                    <div>
                        <div className="post_header" onClick={goToUser}>{comment.user_id.first_name} {comment.user_id.last_name}</div>
                        <div className="login_name" onClick={goToUser}>{comment.user_id.username}</div>
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