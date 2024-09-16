import React from "react";

import { UserProps, FullUserProps, PostProps, CommentProps, FullCommentProps, FullPostProps } from "../Types/DataBase";

const user_desc = "Описание пользователя, не занимающее более двух строк данного блока текста. То есть это около 500(?) символов или ещё меньше."
const postText = "Текст поста, который был опубликован либо этим пользователем, либо репостнут на его страницу. Пост должен занимать не более 1500 символов? Скорее всего это значение должно быть меньше. Текст поста, который был опубликован либо этим пользователем, либо репостнут на его страницу."

export const infUser: FullUserProps = {
    id: 0,
    first_name: "",
    last_name: "",
    phone: "",
    username: "",
    address: "",
    avatar: "",
    head: "",
    email: "",
    birthday: "",
    followers_count: 0,
    subscriptions_count: 0,
    date_joined: "",
    description: "",
}

export const infPost: FullPostProps = {
    id: 1,
    user_id: {
        id: 2,
        first_name: "FirstName",
        last_name: "LastName",
        username: "nick2",
        avatar: ""
    },
    date: "2023-01-01",
    content: postText,
    likes_count: 0,
    repost_id: -1
}

export const infPosts: Array<FullPostProps> = [
    {
        id: 1,
        user_id: {
            id: 2,
            first_name: "FirstName",
            last_name: "LastName",
            username: "nick2",
            avatar: ""
        },
        date: "2023-01-01",
        content: postText,
        likes_count: 0,
        repost_id: -1
    },
    {
        id: 1,
        user_id: {
            id: 2,
            first_name: "FirstName",
            last_name: "LastName",
            username: "nick2",
            avatar: ""
        },
        date: "2023-01-01",
        content: postText,
        likes_count: 0,
        repost_id: -1
    },
    {
        id: 1,
        user_id: {
            id: 2,
            first_name: "FirstName",
            last_name: "LastName",
            username: "nick2",
            avatar: ""
        },
        date: "2023-01-01",
        content: postText,
        likes_count: 0,
        repost_id: -1
    }
]

export const infComments: Array<FullCommentProps> = [
    {
        id: 1,
        user_id: {
            id: 2,
            first_name: "FirstName",
            last_name: "LastName",
            username: "nick2",
            avatar: ""
        },
        date: "02.01.2023",
        content: postText, 
        post_id: 1,
    },
]

export const infSubs: Array<UserProps> = [
    {
        id: 1,
        first_name: "Firstname", 
        last_name: "Lastname",
        username: "nick1",
        avatar: ""
    },
    {
        id: 2,
        first_name: "Firstname", 
        last_name: "Lastname",
        username: "nick2",
        avatar: ""
    },
    {
        id: 3,
        first_name: "Firstname", 
        last_name: "Lastname",
        username: "nick3",
        avatar: ""
    }
]