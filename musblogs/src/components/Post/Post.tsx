import React from "react";
import avatar from "../../images/user_toolkit/avatar.svg";
import comment from "../../images/post/comment.svg";
import repost from "../../images/post/repost.svg";
import like from "../../images/post/like.svg";
import { PostProps } from "../../Types/DataBase";
import { ImageDiv } from "../BasicComponents/ImageDiv/ImageDiv";

export const Post: React.FC<PostProps> = ({...post}) => {
    return (
        <div className="post">
             <div className="user_info">
                <ImageDiv src={avatar} alt="avatar" />
                <div className="text_info">
                    <div>{post.user.firstname} {post.user.lastname}</div>
                    <div>{post.user.login}</div>
                    <div>{post.date}</div>
                </div>
             </div>
             <div>
                {post.text}
             </div>
             <br></br>
             <div>
                <div>
                    <ImageDiv src={comment} alt="comment" />
                    {post.comments}
                </div>
                <div>
                    <ImageDiv src={repost} alt="repost" />
                    {post.reposts}
                </div>
                <div>
                    <ImageDiv src={like} alt="like" />
                    {post.likes}
                </div>
             </div>
        </div>
    )
}