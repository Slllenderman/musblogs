import React, { useState, useEffect } from "react";
import "./MainPage.scss";
import "../../styles/buttons.scss";
import "../../styles/inputs.scss";
import "../../styles/names.scss";
import { Post } from "../Post/Post";
import { PostProps } from "../../Types/DataBase";

export const MainPage: React.FC = () => {

    const [posts, setPosts] = useState<Array<PostProps>>([]);

    useEffect(() => {
        let postText = "Текст поста, который был опубликован либо этим пользователем, либо репостнут на его страницу. Пост должен занимать не более 1500 символов? Скорее всего это значение должно быть меньше. Текст поста, который был опубликован либо этим пользователем, либо репостнут на его страницу."

        setPosts([
            {
                id: 1,
                user: {
                    id: 1,
                    firstname: "FirstName",
                    lastname: "LastName",
                    login: "nick1",
                    avatar: "",
                },
                date: "01.01.2023",
                text: postText,
                comments: 10,
                reposts: 5,
                likes: 15
            },
            {
                id: 2,
                user: {
                    id: 2,
                    firstname: "FirstName",
                    lastname: "LastName",
                    login: "nick2",
                    avatar: "",
                },
                date: "02.01.2023",
                text: postText,
                comments: 100,
                reposts: 20,
                likes: 65
            },
            {
                id: 3,
                user: {
                    id: 3,
                    firstname: "FirstName",
                    lastname: "LastName",
                    login: "nick3",
                    avatar: "",
                },
                date: "03.01.2023",
                text: postText,
                comments: 1000,
                reposts: 500,
                likes: 1200
            }
        ])
    }, [])

    return (
        <div className="feed">
            <div className="top_shadow"></div>
            <div className="feed_content">
                <div className="pink_header">
                    Ваша лента
                </div>
                <div className="posts">
                    {posts.map((post: PostProps, index: number) => {
                        return (
                            <Post {...post} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}