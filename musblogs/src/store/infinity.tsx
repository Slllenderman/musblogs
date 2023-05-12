import React from "react";

import { UserProps, FullUserProps, PostProps, CommentProps } from "../Types/DataBase";

const user_desc = "Описание пользователя, не занимающее более двух строк данного блока текста. То есть это около 500(?) символов или ещё меньше."
const postText = "Текст поста, который был опубликован либо этим пользователем, либо репостнут на его страницу. Пост должен занимать не более 1500 символов? Скорее всего это значение должно быть меньше. Текст поста, который был опубликован либо этим пользователем, либо репостнут на его страницу."

export const infUser: FullUserProps = {
    id: 0,
    password: "",
    last_login: "",
    is_superuser: false,
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    is_staff: false,
    is_active: false,
    date_joined: "",
    followers_count: 0,
    subscriptions_count: 0,
    birthday: "24.07.2000",
    description: "",
    address: "",
    avatar: "",
    head: "",
    groups: [],
    user_permissions: []
}

export const infPost: PostProps = {
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

export const infPosts: Array<PostProps> = [
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
]

export const infComments: Array<CommentProps> = [
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
]

export const infSubs: Array<UserProps> = [
    {
        id: 1,
        firstname: "Firstname", 
        lastname: "Lastname",
        login: "nick1",
        avatar: ""
    },
    {
        id: 2,
        firstname: "Firstname", 
        lastname: "Lastname",
        login: "nick2",
        avatar: ""
    },
    {
        id: 3,
        firstname: "Firstname", 
        lastname: "Lastname",
        login: "nick3",
        avatar: ""
    }, 
    {
        id: 4,
        firstname: "Firstname", 
        lastname: "Lastname",
        login: "nick4",
        avatar: ""
    }
]