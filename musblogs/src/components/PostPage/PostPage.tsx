import React, { useState, useEffect } from "react";
import "./PostPage.scss";
import "../../styles/buttons.scss";
import "../../styles/inputs.scss";
import "../../styles/names.scss";
import { postImages, userToolkit, formToolkit } from "../../images/images";
import { ImageDiv, Button } from "../BasicComponents/BasicComponents";
import { GoBackLine } from "../GoBackLine/GoBackLine";
import { Comment } from "../Comment/Comment";
import { PostProps, CommentProps } from "../../Types/DataBase";

export const PostPage: React.FC = () => {

    const postText = "Текст поста, который был опубликован либо этим пользователем, либо репостнут на его страницу. Пост должен занимать не более 1500 символов? Скорее всего это значение должно быть меньше. Текст поста, который был опубликован либо этим пользователем, либо репостнут на его страницу."

    const infPost: PostProps = {
        id: 1,
        user: {
            id: 1,
            firstname: "FirstName",
            lastname: "LastName",
            login: "nick1",
            avatar: ""
        },
        date: "01.01.2023",
        text: postText,
        comments: 3,
        reposts: 15,
        likes: 1500
    }

    const [formVisible, setFormVisible] = useState(false);
    const [post, setPost] = useState<PostProps>(infPost);
    const [comments, setComments] = useState<Array<CommentProps>>([]);

    const changeFormVisible = (e: any) => {
        setFormVisible(!formVisible);
    }

    useEffect(() => {
        setComments([
            {
                id: 1,
                user: {
                    id: 2,
                    firstname: "FirstName",
                    lastname: "LastName",
                    login: "nick2",
                    avatar: ""
                },
                date: "02.01.2023",
                text: postText, 
                post: 1,
            },
            {
                id: 2,
                user: {
                    id: 3,
                    firstname: "FirstName",
                    lastname: "LastName",
                    login: "nick3",
                    avatar: ""
                },
                date: "02.01.2023",
                text: postText, 
                post: 1,
            },
            {
                id: 3,
                user: {
                    id: 4,
                    firstname: "FirstName",
                    lastname: "LastName",
                    login: "nick4",
                    avatar: ""
                },
                date: "02.01.2023",
                text: postText, 
                post: 1,
            }
        ])
    }, [])

    return (
        <div className="feed">
            <GoBackLine />
            <div className="post_page">
                <div className="post_info">
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
                <div className="comment_header">
                    <span className="post_header">Комментарии</span>
                    <Button text="Оставить комментарий" class="basic_button add_comment_button" onClickFunction={changeFormVisible} />
                </div>
                <div className="comments">
                    {comments.map((comment: CommentProps, index: number) => {
                        return (
                            <Comment {...comment} />
                        )
                    })}
                </div>
                {formVisible ?
                    <div className="add_comment">
                        <div className="form"> 
                            <textarea className="basic_input"></textarea>
                            <Button text=">" class="bottom_button create_comment_button" />
                        </div>
                    </div>
                : <div className="add_comment"></div>}
            </div>
        </div>
    )
}