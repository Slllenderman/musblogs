import React, { useState, useEffect } from "react";
import "./UserPage.scss";
import "../../styles/buttons.scss";
import "../../styles/inputs.scss";
import "../../styles/names.scss";
import settings from "../../images/user_toolkit/settings.svg";
import create_post from "../../images/user_toolkit/create_post.svg";
import avatar from "../../images/user_toolkit/avatar.svg";
import link from "../../images/user_toolkit/link.svg";
import location from "../../images/user_toolkit/location.svg";
import showing_button from "../../images/user_toolkit/showing_button.svg";
import birthday from "../../images/user_toolkit/birthday.svg";
import { useNavigate } from "react-router-dom";
import { Button } from "../BasicComponents/Button/Button";
import { ImageDiv } from "../BasicComponents/ImageDiv/ImageDiv";
import { FullUserProps } from "../../Types/DataBase";
import { PostProps } from "../../Types/DataBase";
import { CommentProps } from "../../Types/DataBase";
import { Comment } from "../Comment/Comment";
import { Post } from "../Post/Post";

export const UserPage: React.FC = () => {

    const user_desc = "Описание пользователя, не занимающее более двух строк данного блока текста. То есть это около 500(?) символов или ещё меньше."

    const infUser: FullUserProps = {
        id: 1,
        firstname: "FirstName", 
        lastname: "LastName",
        login: "nickname",
        birthday: "24.07.2001",
        link: "https://telegram.com",
        location: "city",
        description: user_desc,
        registration: "01.01.2023",
        avatar: "",
        subscriptions: 100,
        subscribes: 100,
    }

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

        setLikePosts([
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

        setComments([
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
        ])
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
                            <ImageDiv class="user_toolkit" src={settings} alt="settings" onClickFunction={goToSettings}/>
                            <ImageDiv class="u_avatar" src={avatar} alt="avatar" />
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
                            <ImageDiv class="user_toolkit" src={create_post} alt="create_post" onClickFunction={goToCreatingPost} />
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
                                        <ImageDiv class="note" src={birthday} alt="birthday" />
                                        <div className="date">
                                            <div className="first dark_header">{GetDayOfDate(user.birthday)}</div>
                                            <div className="last dark_name">{GetMonthOfDate(user.birthday)}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="right_content">
                                    <div className="option">
                                        <ImageDiv class="option_img" src={link} alt="link" />
                                        <a href={user.link} className="link_name">{user.link}</a>
                                    </div>
                                    <div className="option">
                                        <ImageDiv class="option_img" src={location} alt="location" />
                                        <div className="link_name">{user.location}</div>
                                    </div>
                                    <div className="desc">{user.description}</div>
                                    <div className="login_name">Регитсрация: {user.registration}</div>
                                </div>
                                <div className="space">
                                </div>
                                <div className="showing_button">
                                    <ImageDiv class="img_div" src={showing_button} alt="shw_button" onClickFunction={changeShowing} />
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