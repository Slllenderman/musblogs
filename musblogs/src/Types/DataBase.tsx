import React from "react";

export type FullUserProps = {
    id: number,
    firstname: string,
    lastname: string,
    login: string,
    birthday: string,
    link: string,
    location: string,
    description: string,
    registration: string,
    avatar: string,
    subscriptions: number,
    subscribes: number
}

export type UserProps = {
    id: number,
    firstname: string,
    lastname: string,
    login: string,
    avatar: string,
}

export type Comment = {
    id: number,
    user: UserProps,
    date: string,
    text: string,
    post: number
}

export type PostProps = {
    id: number,
    user: UserProps,
    date: string,
    text: string,
    comments: number,
    reposts: number,
    likes: number,
}