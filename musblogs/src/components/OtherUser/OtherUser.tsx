import React, { useState, useEffect } from "react";
import "./OtherUser.scss";
import "../../styles/buttons.scss";
import "../../styles/inputs.scss";
import "../../styles/names.scss";
import { userToolkit } from "../../images/images";
import { ImageDiv, Button } from "../BasicComponents/BasicComponents";
import { Comment } from "../Comment/Comment";
import { Post } from "../Post/Post";
import { FullPostProps, FullCommentProps, FullUserProps, FollowerProps } from "../../Types/DataBase";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { GetDayOfDate, GetMonthOfDate, GetYearOfDate, ValidateNumber } from "../../validate/Validate";
import Cookies from 'universal-cookie';
import axios from "axios";
import { fullPostsUrl, fullCommentsUrl, usersInfoUrl, followersUrl, tokenName } from "../../urls/bdUrls";
import { useParams } from "react-router-dom";
import { infUser } from "../../store/infinity";

export const OtherUser: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const cookies = new Cookies()
    const userInfo = useAppSelector((state) => state.userInfoReducer)

    const [buttonText, setbuttonText] = useState("Читать")

    const [user, setUser] = useState<FullUserProps>(infUser);
    const [showing, setShowing] = useState(true);
    const [options, setOptions] = useState([true, false, false]);
    const [posts, setPosts] = useState<Array<FullPostProps>>([]);
    const [likePosts, setLikePosts] = useState<Array<FullPostProps>>([]);
    const [comments, setComments] = useState<Array<FullCommentProps>>([]);
    const [subscribers, setSubscribers] = useState<Array<FollowerProps>>([])
    const [subscriptions, setSubscriptions] = useState<Array<FollowerProps>>([])

    const createFollower = (e: any) => {
        if (user.id !== 0 && userInfo.user.id !== 0 && buttonText != "Вы читаете") {
            const postProps: FollowerProps = {
                user_id: userInfo.user.id,
                follower_id: user.id
            }
            axios.post(followersUrl, {...postProps}, {headers: {
                'Content-Type': 'application/json',
                'Authorization': tokenName + ' ' + cookies.get("auth_token"),
            }})
            .then((response) => {
                console.log(response)
                setbuttonText("Вы читаете")
            })
            .catch((error: any) => {
                console.log(error)
            })
        }
    }

    useEffect(() => {
        if (!cookies.get("auth_token"))
            navigate("/login");
        else {
            if (userInfo.user.id.toString() === id)
                navigate('/userpage')
            else {
                axios.get(followersUrl + "?user_id=" + id)
                .then((sResponse) => {
                    setSubscriptions(sResponse.data)
                })
                axios.get(followersUrl + "?follower_id=" + id)
                .then((fResponse) => {
                    setSubscribers(fResponse.data)
                })
                axios.get(followersUrl + "?username=" + cookies.get("username") + "&follower_id=" + id)
                .then((response) => {
                    if (response.data.length !== 0)
                        setbuttonText("Вы читаете")
                })
                axios.get(usersInfoUrl + id + "/")
                .then((response) => {
                    setUser(response.data)
                    axios.get(fullPostsUrl + "?user_id=" + id)
                    .then((postResponse) => {
                        setPosts(postResponse.data)
                    })
                    axios.get(fullCommentsUrl + "?user_id=" + id)
                    .then((commentResponse) => {
                        setComments(commentResponse.data)
                    })
                })
                .catch((error: any) => {
                    console.log(error)
                })
            }
        }
    }, [])

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
                            <ImageDiv class="u_avatar" src={userToolkit.avatar} alt="avatar" />
                            <div className="text_info">
                                <div>
                                    <div className="black_header">{user.first_name} {user.last_name}</div>
                                    <div className="user_page_name">{user.username}</div>
                                </div>
                                <div className="subs">
                                    <div className="user_page_name" onClick={(e: any) => {goToUrl("/subscriptions/" + id)}}>
                                        {subscriptions.length} подписок
                                    </div>
                                    <div className="user_page_name" onClick={(e: any) => {goToUrl("/subscribers/" + id)}}>
                                        {subscribers.length} подписчиков
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right_content">
                            <Button 
                                text={buttonText}
                                class="basic_button"
                                onClickFunction={createFollower}
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
                            likePosts.map((post: FullPostProps, index: number) => {
                                return (
                                    <Post {...post} key={index} />
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