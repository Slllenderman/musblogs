import React, { useState, useEffect } from "react";
import "./UserPage.scss";
import "../../styles/buttons.scss";
import "../../styles/inputs.scss";
import "../../styles/names.scss";
import { userToolkit } from "../../images/images";
import { ImageDiv, Button } from "../BasicComponents/BasicComponents";
import { Comment } from "../Comment/Comment";
import { Post } from "../Post/Post";
import { FullPostProps, FullCommentProps, FollowerProps, FullLikeProps } from "../../Types/DataBase";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { GetDayOfDate, GetMonthOfDate, GetYearOfDate, ValidateNumber } from "../../validate/Validate";
import Cookies from 'universal-cookie';
import { getOtherUserInfo } from "../../store/actions/getUserInfo";
import axios from "axios";
import { fullPostsUrl, fullCommentsUrl, followersUrl } from "../../urls/bdUrls";

export const UserPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const cookies = new Cookies()
    const {token, user, posts, comments, likes, subscriptions, subscribers} = useAppSelector((state) => state.userInfoReducer)

    const [showing, setShowing] = useState(true);
    const [options, setOptions] = useState([true, false, false]);
    //const [posts, setPosts] = useState<Array<FullPostProps>>([]);
    //const [likePosts, setLikePosts] = useState<Array<FullPostProps>>([]);
    //const [comments, setComments] = useState<Array<FullCommentProps>>([]);
    //const [subscribers, setSubscribers] = useState<Array<FollowerProps>>([])
    //const [subscriptions, setSubscriptions] = useState<Array<FollowerProps>>([])

    useEffect(() => {
        if (!cookies.get("auth_token"))
            navigate("/login");
        else {
            dispatch(getOtherUserInfo({login: cookies.get("username")}))
        }
    }, [user, token])

    const goToUrl = (url : string) => {
        if (cookies.get("auth_token")) {
            navigate(url)
        }
        else
            navigate("/login")
    }

    return (
        <div className="feed">
            <div className="user_page">
                <div className="user_header">
                    <div className="content">
                        <div className="left_content">
                            <ImageDiv 
                                class="user_toolkit" 
                                src={userToolkit.settings} 
                                alt="settings" 
                                onClickFunction={(e: any) => {goToUrl("/settings")}}
                            />
                            <ImageDiv class="u_avatar" src={userToolkit.avatar} alt="avatar" />
                            <div className="text_info">
                                <div>
                                    <div className="black_header">{user.first_name} {user.last_name}</div>
                                    <div className="user_page_name">{user.username}</div>
                                </div>
                                <div className="subs">
                                    <div className="user_page_name" onClick={(e: any) => {goToUrl("/subscriptions")}}>
                                        {subscriptions.length} подписок
                                    </div>
                                    <div className="user_page_name" onClick={(e: any) => {goToUrl("/subscribers")}}>
                                        {subscribers.length} подписчиков
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right_content">
                            <ImageDiv 
                                class="user_toolkit" 
                                src={userToolkit.create_post} 
                                alt="create_post" 
                                onClickFunction={(e: any) => {goToUrl("/new_post")}} 
                            />
                        </div>
                    </div>
                </div>

                <div className="user_other_info">
                    {showing ?
                        <>
                            <div className="content">
                                <div className="birthday">
                                    <div className="header">
                                        День рождения
                                    </div>
                                    <div className="block">
                                        <ImageDiv class="note" src={userToolkit.birthday} alt="birthday" />
                                        <div className="date">
                                            <div className="first dark_header">{GetDayOfDate(user.birthday)}</div>
                                            <div className="date_line"></div>
                                            <div className="last dark_name">{GetMonthOfDate(user.birthday)}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="right_content">
                                    <div className="option">
                                        <ImageDiv class="option_img" src={userToolkit.link} alt="link" />
                                        <a href={user.email} className="link_name">{user.head}</a>
                                    </div>
                                    <div className="option">
                                        <ImageDiv class="option_img" src={userToolkit.location} alt="location" />
                                        <div className="link_name">{user.address}</div>
                                    </div>
                                    <div className="desc">{user.description}</div>
                                    <div className="login_name">
                                        Регитсрация: {GetMonthOfDate(user.date_joined)} {GetYearOfDate(user.date_joined)} г.
                                    </div>
                                </div>
                                <div className="space">
                                </div>
                                <div className="showing_button">
                                    <ImageDiv 
                                        class="img_div" 
                                        src={userToolkit.showing_button} 
                                        alt="shw_button" 
                                        onClickFunction={(e: any) => {setShowing(!showing);}} 
                                    />
                                </div>
                            </div>
                            <hr></hr>
                        </>
                    :
                    <div className="blue_line" onClick={(e: any) => {
                        setShowing(!showing);
                    }}>
                        Развернуть
                    </div>}
                </div>

                <div className="buttons">
                    <Button 
                        text="Посты" 
                        class={options[0] ? "clicked_static_button" : "static_button"} 
                        onClickFunction={(e: any) => {setOptions([true, false, false])}}
                    />
                    <Button 
                        text="Комментарии" 
                        class={options[1] ? "clicked_static_button" : "static_button"} 
                        onClickFunction={(e: any) => {setOptions([false, true, false])}} 
                    />
                    <Button 
                        text="Лайки" 
                        class={options[2] ? "clicked_static_button" : "static_button"} 
                        onClickFunction={(e: any) => {setOptions([false, false, true])}} 
                    />
                </div>

                <div className="user_posts">
                        {options[0] ?
                            posts.map((post: FullPostProps, index: number) => {
                                return (
                                    <Post {...post} key={index} />
                                )
                            })
                        : options[2] ?
                            likes.map((like_p: FullLikeProps, index: number) => {
                                return (
                                    <Post {...like_p.post_id} key={index} />
                                )
                            })  
                        : options[1] ?
                            comments.map((comment: FullCommentProps, index: number) => {
                                return (
                                    <Comment {...comment} key={index} />
                                )
                            })
                        : <div></div>}
                </div>
            </div>
        </div>
    )
}