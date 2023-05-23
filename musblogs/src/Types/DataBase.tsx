import React from "react";
import { StringMappingType } from "typescript";

export type FullUserProps = {
    id: number,
    first_name: string,
    last_name: string,
    phone: string,
    username: string,
    address: string | undefined,
    avatar: string | undefined,
    head: string | undefined,
    email: string,
    birthday: string | undefined,
    followers_count: number | undefined,
    subscriptions_count: number | undefined,
    date_joined: string,
    description: string | undefined,
}

export type UserProps = {
    id: number,
    first_name: string,
    last_name: string,
    username: string,
    avatar: string,
}

export type CommentProps = {
    id: number,
    date: string,
    content: string,
    user_id: number,
    post_id: number
}

export type FullCommentProps = {
    id: number,
    user_id: UserProps,
    date: string,
    content: string,
    post_id: number
}


export type PostProps = {
    id: number,
    date: string,
    content: string,
    likes_count: number,
    user_id: number,
    repost_id: number,
}

export type FullPostProps = {
    id: number,
    user_id: UserProps,
    date: string,
    content: string,
    likes_count: number,
    repost_id: number,
}

export type LikeProps = {
    post_id: number,
    user_id: number
}

export type FollowerProps = {
    user_id: number,
    follower_id: number
}

export type FullFollowerProps = {
    user_id: UserProps,
    follower_id: UserProps
}

export type Notifications = {
    user_id: number,
    post_id: number,
}

export type TokenProps = {
    auth_token: string
}