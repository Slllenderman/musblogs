import React, { useState, useEffect } from "react";
import "./Post.scss";
import "../../styles/names.scss";
import { postImages, userToolkit, formToolkit } from "../../images/images";
import { ImageDiv } from "../BasicComponents/BasicComponents";
import { GetDayOfDate, GetMonthOfDate, GetYearOfDate, ValidateNumber } from "../../validate/Validate";
import { FullUserProps, FullPostProps } from "../../Types/DataBase";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { commentsUrl } from "../../urls/bdUrls";

export const Post: React.FC<FullPostProps> = ({...post}) => {

    const navigate = useNavigate()
    const [commentsCount, setCommentsCount] = useState(0)

    const goToPostPage = (e: any) => {
        navigate("/post/" + post.id)
    }

    const goToUser = (e: any) => {
        navigate("/user/" + post.user_id.id)
    }

    useEffect(() => {
        axios.get(commentsUrl + "?post_id=" + post.id)
        .then((response) => {
            setCommentsCount(response.data.length)
        })
    }, [])

    return (
        <div className="post" onClick={goToPostPage}>
            <ImageDiv class="settings" src={formToolkit.other_info} alt="settings" onClickFunction={goToUser} />
             <div className="user_info">
                <ImageDiv class="user_avatar" src={userToolkit.avatar} alt="avatar" />
                <div className="text_info">
                    <div className="post_header" onClick={goToUser}>{post.user_id.first_name} {post.user_id.last_name}</div>
                    <div className="login_name" onClick={goToUser}>{post.user_id.username}</div>
                    <div className="date login_name">{GetDayOfDate(post.date)} {GetMonthOfDate(post.date)}, {GetYearOfDate(post.date)}</div>
                </div>
             </div>
             <div className="post_text">
                {post.content}
             </div>
             <hr></hr>
             <div className="match_info">
                <div className="block">
                    <ImageDiv src={postImages.comment} alt="comment" />
                    <div className="login_name number">{commentsCount}</div>
                </div>
                <div className="block">
                    <ImageDiv src={postImages.repost} alt="repost" />
                    <div className="login_name number">0</div>
                </div>
                <div className="block">
                    <ImageDiv src={postImages.like} alt="like" />
                    <div className="login_name number">0</div>
                </div>
             </div>
        </div>
    )
}