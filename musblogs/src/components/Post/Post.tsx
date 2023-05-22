import React, { useState, useEffect } from "react";
import "./Post.scss";
import "../../styles/names.scss";
import { postImages, userToolkit, formToolkit } from "../../images/images";
import { ImageDiv } from "../BasicComponents/BasicComponents";
import axios from "axios";
import { useParams } from "react-router-dom";
import { usersInfoUrl } from "../../urls/bdUrls";
import { FullUserProps, FullPostProps } from "../../Types/DataBase";
import { infUser } from "../../store/infinity";

export const Post: React.FC<FullPostProps> = ({...post}) => {
    return (
        <div className="post">
            <ImageDiv class="settings" src={formToolkit.other_info} alt="settings" />
             <div className="user_info">
                <ImageDiv class="user_avatar" src={userToolkit.avatar} alt="avatar" />
                <div className="text_info">
                    <div className="post_header">{post.user_id.first_name} {post.user_id.last_name}</div>
                    <div className="login_name">{post.user_id.username}</div>
                    <div className="date login_name">{post.date}</div>
                </div>
             </div>
             <div className="post_text">
                {post.content}
             </div>
             <hr></hr>
             <div className="match_info">
                <div className="block">
                    <ImageDiv src={postImages.comment} alt="comment" />
                    <div className="login_name number">0</div>
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