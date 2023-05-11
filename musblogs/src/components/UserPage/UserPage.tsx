import React, { useState, useEffect } from "react";
import "./UserPage.scss";
import "../../styles/buttons.scss";
import "../../styles/inputs.scss";
import "../../styles/names.scss";
import { userToolkit } from "../../images/images";
import { ImageDiv, Button } from "../BasicComponents/BasicComponents";
import { Comment } from "../Comment/Comment";
import { Post } from "../Post/Post";
import { infUser, infPosts, infComments } from "../../store/infinity";
import { FullUserProps, PostProps, CommentProps } from "../../Types/DataBase";
import { useNavigate } from "react-router-dom";

export const UserPage: React.FC = () => {
    const navigate = useNavigate();

    const [showing, setShowing] = useState(true);
    const [user, setUser] = useState<FullUserProps>(infUser);
    const [options, setOptions] = useState([true, false, false]);
    const [posts, setPosts] = useState<Array<PostProps>>([]);
    const [likePosts, setLikePosts] = useState<Array<PostProps>>([]);
    const [comments, setComments] = useState<Array<CommentProps>>([]);

    const GetDayOfDate = (date: string) => {
        return date.split('.')[0]
    }

    const GetMonthOfDate = (date: string) => {
        const months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь']
        const intValue = parseInt(date.split('.')[1])
        return months[intValue - 1]
    }

    useEffect(() => {
        setPosts([...infPosts])
        setLikePosts([...infPosts])
        setComments([...infComments])
    }, [])

    useEffect(() => {

    }, [])

    const changeShowing = (e: any) => {
        setShowing(!showing);
    }

    const changeOptionOne = (e: any) => {
        setOptions([true, false, false])
    }

    const changeOptionTwo = (e: any) => {
        setOptions([false, true, false])
    }

    const changeOptionThree = (e: any) => {
        setOptions([false, false, true])
    }

    const goToSettings = (e: any) => {
        navigate("/settings")
    }

    const goToSubscriptions = (e: any) => {
        navigate("/subscriptions")
    }

    const goToSubscribers = (e: any) => {
        navigate("/subscribers")
    }

    const goToCreatingPost = (e: any) => {
        navigate("/new_post")
    }

    return (
        <div className="feed">
            <div className="user_page">
                <div className="user_header">
                    <div className="content">
                        <div className="left_content">
                            <ImageDiv class="user_toolkit" src={userToolkit.settings} alt="settings" onClickFunction={goToSettings}/>
                            <ImageDiv class="u_avatar" src={userToolkit.avatar} alt="avatar" />
                            <div className="text_info">
                                <div>
                                    <div className="black_header">{user.firstname} {user.lastname}</div>
                                    <div className="user_page_name">{user.login}</div>
                                </div>
                                <div className="subs">
                                    <div className="user_page_name" onClick={goToSubscriptions}>{user.subscriptions} подписок</div>
                                    <div className="user_page_name" onClick={goToSubscribers} >{user.subscribes} подписчиков</div>
                                </div>
                            </div>
                        </div>
                        <div className="right_content">
                            <ImageDiv class="user_toolkit" src={userToolkit.create_post} alt="create_post" onClickFunction={goToCreatingPost} />
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
                                            <div className="last dark_name">{GetMonthOfDate(user.birthday)}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="right_content">
                                    <div className="option">
                                        <ImageDiv class="option_img" src={userToolkit.link} alt="link" />
                                        <a href={user.link} className="link_name">{user.link}</a>
                                    </div>
                                    <div className="option">
                                        <ImageDiv class="option_img" src={userToolkit.location} alt="location" />
                                        <div className="link_name">{user.location}</div>
                                    </div>
                                    <div className="desc">{user.description}</div>
                                    <div className="login_name">Регитсрация: {user.registration}</div>
                                </div>
                                <div className="space">
                                </div>
                                <div className="showing_button">
                                    <ImageDiv class="img_div" src={userToolkit.showing_button} alt="shw_button" onClickFunction={changeShowing} />
                                </div>
                            </div>
                            <hr></hr>
                        </>
                    :
                    <div className="blue_line" onClick={changeShowing}>
                        Развернуть
                    </div>}
                </div>

                <div className="buttons">
                    <Button text="Посты" class={options[0] ? "clicked_static_button" : "static_button"} onClickFunction={changeOptionOne}/>
                    <Button text="Комментарии" class={options[1] ? "clicked_static_button" : "static_button"} onClickFunction={changeOptionTwo} />
                    <Button text="Лайки" class={options[2] ? "clicked_static_button" : "static_button"} onClickFunction={changeOptionThree} />
                </div>

                <div className="user_posts">
                        {options[0] ?
                            posts.map((post: PostProps, index: number) => {
                                return (
                                    <Post {...post} />
                                )
                            })
                        : options[2] ?
                            likePosts.map((post: PostProps, index: number) => {
                                return (
                                    <Post {...post} />
                                )
                            })  
                        : options[1] ?
                            comments.map((comment: CommentProps, index: number) => {
                                return (
                                    <Comment {...comment} />
                                )
                            })
                        : <div></div>}
                </div>
            </div>
        </div>
    )
}