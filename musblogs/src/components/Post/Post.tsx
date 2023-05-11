import React from "react";
import "./Post.scss";
import "../../styles/names.scss";
import { postImages, userToolkit, formToolkit } from "../../images/images";
import { PostProps } from "../../Types/DataBase";
import { ImageDiv } from "../BasicComponents/BasicComponents";

export const Post: React.FC<PostProps> = ({...post}) => {
    return (
        <div className="post">
            <ImageDiv class="settings" src={formToolkit.other_info} alt="settings" />
             <div className="user_info">
                <ImageDiv class="user_avatar" src={userToolkit.avatar} alt="avatar" />
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
                    <ImageDiv src={postImages.comment} alt="comment" />
                    <div className="login_name number">{post.comments}</div>
                </div>
                <div className="block">
                    <ImageDiv src={postImages.repost} alt="repost" />
                    <div className="login_name number">{post.reposts}</div>
                </div>
                <div className="block">
                    <ImageDiv src={postImages.like} alt="like" />
                    <div className="login_name number">{post.likes}</div>
                </div>
             </div>
        </div>
    )
}