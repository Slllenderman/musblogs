import React, { useState, useEffect } from "react";
import "./Post.scss";
import "../../styles/names.scss";
import { postImages, userToolkit, formToolkit } from "../../images/images";
import { ImageDiv } from "../BasicComponents/BasicComponents";
import { GetDayOfDate, GetMonthOfDate, GetYearOfDate, ValidateNumber } from "../../validate/Validate";
import { FullUserProps, FullPostProps } from "../../Types/DataBase";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { commentsUrl, likesUrl, tokenName } from "../../urls/bdUrls";
import Cookies from "universal-cookie";
import { useAppSelector, useAppDispatch } from "../../store";
import { getCookies } from "../../store/actions/getUserInfo";

export const Post: React.FC<FullPostProps> = ({...post}) => {

    const navigate = useNavigate()
    const cookies = new Cookies()
    const dispatch = useAppDispatch()
    const [commentsCount, setCommentsCount] = useState(0)
    const {user, token} = useAppSelector((state) => state.userInfoReducer)
    const [likes, setLikes] = useState(0)
    const [myLike, setMyLike] = useState(false)

    const goToPostPage = (e: any) => {
        navigate("/post/" + post.id)
    }

    const goToUser = (e: any) => {
        navigate("/user/" + post.user_id.id)
    }

    useEffect(() => {
        if (!cookies.get("auth_token"))
            navigate("/login")
        else {
            axios.get(commentsUrl + "?post_id=" + post.id)
            .then((response) => {
                setCommentsCount(response.data.length)
            })
            isMyLike()
            getLikes()
        }
    }, [])

    const createLike = (e: any) => {
        if (!myLike) {
            const body = {
                post_id: post.id,
                user_id: user.id
            }
            axios.post(likesUrl, {...body}, {headers: {
                'Content-Type': 'application/json',
                'Authorization': tokenName + ' ' + cookies.get("auth_token"),
            }})
            .then((response) => {
                setMyLike(true)
                getLikes()
            })
            .catch((error: any) => {
                console.log(error)
            })
        }
    }

    const getLikes = () => {
        axios.get(likesUrl + "?post_id=" + post.id)
        .then((response) => {
            setLikes(response.data.length)
        })
    }

    const isMyLike = () => {
        axios.get(likesUrl + "?post_id=" + post.id + "&user_id=" + user.id)
        .then((response) => {
            if (response.data.length !== 0)
                setMyLike(true)
        })
    }

    return (
        <div className="post">
            <ImageDiv class="settings" src={formToolkit.other_info} alt="settings" onClickFunction={goToUser} />
             <div className="user_info">
                <ImageDiv class="user_avatar" src={userToolkit.avatar} alt="avatar" />
                <div className="text_info">
                    <div className="post_header" onClick={goToUser}>{post.user_id.first_name} {post.user_id.last_name}</div>
                    <div className="login_name" onClick={goToUser}>{post.user_id.username}</div>
                    <div className="date login_name">{GetDayOfDate(post.date)} {GetMonthOfDate(post.date)}, {GetYearOfDate(post.date)}</div>
                </div>
             </div>
             <div className="post_text" onClick={goToPostPage}>
                {post.content}
             </div>
             <hr></hr>
             <div className="match_info">
                <div className="block">
                    <ImageDiv src={postImages.comment} alt="comment" onClickFunction={goToPostPage}/>
                    <div className="login_name number">{commentsCount}</div>
                </div>
                <div className="block">
                    <ImageDiv src={postImages.repost} alt="repost" />
                    <div className="login_name number">0</div>
                </div>
                <div className="block">
                    <ImageDiv src={postImages.like} alt="like" onClickFunction={createLike}/>
                    <div className="login_name number">{likes}</div>
                </div>
             </div>
        </div>
    )
}