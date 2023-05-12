import React from "react";
import { StringMappingType } from "typescript";

export type FullUserProps = {
    id: number,
    password: string,
    last_login: string,
    is_superuser: boolean,
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    is_staff: boolean,
    is_active: boolean,
    date_joined: string,
    followers_count: number,
    subscriptions_count: number,
    birthday: string,
    description: string,
    address: string,
    avatar: string,
    head: string,
    groups: Array<number>,
    user_permissions: Array<number>
}

export type UserProps = {
    id: number,
    firstname: string,
    lastname: string,
    login: string,
    avatar: string,
}

export type CommentProps = {
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

export type TokenProps = {
    auth_token: string
}