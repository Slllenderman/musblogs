import React from "react";
import "./Post.scss";
import "../../styles/names.scss";
import avatar from "../../images/user_toolkit/avatar.svg";
import comment from "../../images/post/comment.svg";
import other_info from "../../images/form_toolkit/other_info.svg";
import repost from "../../images/post/repost.svg";
import like from "../../images/post/like.svg";
import { PostProps } from "../../Types/DataBase";
import { ImageDiv } from "../BasicComponents/ImageDiv/ImageDiv";

export const Post: React.FC<PostProps> = ({...post}) => {
    return (
        <div className="post">
            <ImageDiv class="settings" src={other_info} alt="settings" />
             <div className="user_info">
                <ImageDiv class="user_avatar" src={avatar} alt="avatar" />
                <div className="text_info">
                    <div className="post_header">{post.user.firstname} {post.user.lastname}</div>
                    <div className="login_name">{post.user.login}</div>
                    <div className="date login_name">{post.date}</div>
                </div>
             </div>
             <div className="post_text">
                {post.text}
             </div>
             <hr></hr>
             <div className="match_info">
                <div className="block">
                    <ImageDiv src={comment} alt="comment" />
                    <div className="login_name number">{post.comments}</div>
                </div>
                <div className="block">
                    <ImageDiv src={repost} alt="repost" />
                    <div className="login_name number">{post.reposts}</div>
                </div>
                <div className="block">
                    <ImageDiv src={like} alt="like" />
                    <div className="login_name number">{post.likes}</div>
                </div>
             </div>
        </div>
    )
}