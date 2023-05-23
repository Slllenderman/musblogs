import React, { useState, useEffect } from "react";
import "./PostPage.scss";
import "../../styles/buttons.scss";
import "../../styles/inputs.scss";
import "../../styles/names.scss";
import { postImages, userToolkit, formToolkit } from "../../images/images";
import { ImageDiv, Button } from "../BasicComponents/BasicComponents";
import { GoBackLine } from "../GoBackLine/GoBackLine";
import { Comment } from "../Comment/Comment";
import { FullPostProps, FullCommentProps } from "../../Types/DataBase";
import { infPost, infComments } from "../../store/infinity";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { GetDayOfDate, GetMonthOfDate, GetYearOfDate, ValidateNumber } from "../../validate/Validate";
import Cookies from 'universal-cookie';
import axios from "axios";
import { getOtherUserInfo } from "../../store/actions/getUserInfo";
import { fullPostsUrl, commentsUrl, fullCommentsUrl, postsUrl, tokenName, likesUrl } from "../../urls/bdUrls";

export const PostPage: React.FC = () => {

    const { id } = useParams()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const cookies = new Cookies()
    const { user, token } = useAppSelector((state) => state.userInfoReducer)
    const [formVisible, setFormVisible] = useState(false);
    const [post, setPost] = useState<FullPostProps>(infPost);
    const [comments, setComments] = useState<Array<FullCommentProps>>([]);
    const [commentText, setCommentText] = useState("");
    const [likes, setLikes] = useState(0)
    const [myLike, setMyLike] = useState(false)
    const [likeId, setLikeId] = useState(-1)
    const [isLoading, setLoading] = useState(false)

    const changeFormVisible = (e: any) => {
        setFormVisible(!formVisible);
    }

    const goToUser = (e: any) => {
        navigate("/user/" + post.user_id.id)
    }

    useEffect(() => {
        if (!cookies.get('auth_token')) {
            console.log("non authrized")
            navigate('/login')
        }
        else {
            axios.get(fullPostsUrl + id + "/")
            .then((response) => {
                setPost(response.data)
                axios.get(fullCommentsUrl + "?post_id=" + id)
                .then((response) => {
                    setComments([...response.data])
                    setLoading(true)
                    isMyLike()
                    getLikes()
                })
                .catch((error: any) => {

                })
            })
            .catch((error: any) => {

            })
        }
    }, [user, token])

    const createComment = (e: any) => {
        const commentValues = {
            content: commentText,
            user_id: user.id,
            post_id: id,
        }
        axios.post(commentsUrl, {...commentValues}, {headers: {
            'Content-Type': 'application/json',
            'Authorization': tokenName + ' ' + cookies.get('auth_token'),
        }})
        .then((response) => {
            axios.get(fullCommentsUrl + response.data.id + "/")
            .then((postResponse) => {
                const newComment: FullCommentProps = {
                    ...postResponse.data
                }
                setComments([newComment, ...comments])
                setCommentText("")
                setFormVisible(!formVisible)
            })
            .catch((error: any) => {

            })
        })
        .catch((error: any) => {
            console.log(error)
        })
    }

    const goToUserPage = (e: any) => {
        if (!cookies.get('auth_token')) {
            console.log("non authrized")
            navigate('/login')
        }
        else {
            navigate('/userpage')
        }
    }

    const changeCommentText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCommentText(e.target.value)
    }

    const getLikes = () => {
        axios.get(likesUrl + "?post_id=" + id)
        .then((response) => {
            setLikes(response.data.length)
            setLoading(false)
        })
    }

    const isMyLike = () => {
        axios.get(likesUrl + "?post_id=" + id + "&user_id=" + user.id)
        .then((response) => {
            if (response.data.length !== 0) {
                setMyLike(true)
                setLikeId(response.data[0].id)
            }
        })
    }

    const updateLike = (e: any) => {
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
                setLikeId(response.data.id)
                getLikes()
            })
            .catch((error: any) => {
                console.log(error)
            })
        }
        else {
            if (likeId !== -1) {
                axios.delete(likesUrl + likeId + "/", {headers: {
                    'Content-Type': 'application/json',
                    'Authorization': tokenName + ' ' + cookies.get("auth_token"),
                }})
                .then((response) => {
                    setMyLike(false)
                    setLikeId(-1)
                    getLikes()
                    dispatch(getOtherUserInfo({login: cookies.get("username")}))
                })
                .catch((error: any) => {
                    console.log(error)
                })
            }
        }
    }

    return (
        <div className="feed">
            <GoBackLine onClickFunction={goToUserPage}/>
            <div className="post_page">
                <div className="post_info">
                    <ImageDiv class="settings" src={formToolkit.other_info} alt="settings" onClickFunction={goToUser}/>
                    <div className="user_info">
                        <ImageDiv class="user_avatar" src={userToolkit.avatar} alt="avatar" />
                        <div className="text_info">
                            <div className="post_header" onClick={goToUser}>{post.user_id.first_name} {post.user_id.last_name}</div>
                            <div className="login_name" onClick={goToUser}>{post.user_id.username}</div>
                            <div className="date login_name">{GetDayOfDate(post.date)} {GetMonthOfDate(post.date)}, {GetYearOfDate(post.date)}</div>
                        </div>
                    </div>
                    <div className="post_text">
                        {post.content}
                    </div>
                    <hr></hr>
                    <div className="match_info">
                        <div className="block">
                            <ImageDiv src={postImages.comment} alt="comment" />
                            <div className="login_name number">{comments.length}</div>
                        </div>
                        <div className="block">
                            <ImageDiv src={postImages.repost} alt="repost" />
                            <div className="login_name number">0</div>
                        </div>
                        <div className="block">
                            <ImageDiv src={myLike ? postImages.my_like : postImages.like} alt="like" onClickFunction={updateLike}/>
                            <div className="login_name number">{!isLoading ? likes : "..."}</div>
                        </div>
                    </div>
                </div>
                <div className="comment_header">
                    <span className="post_header">Комментарии</span>
                    <Button text="Оставить комментарий" class="basic_button add_comment_button" onClickFunction={changeFormVisible} />
                </div>
                <div className="comments">
                    {comments.map((comment: FullCommentProps, index: number) => {
                        return (
                            <Comment {...comment} key={index} />
                        )
                    })}
                </div>
                {formVisible ?
                    <div className="add_comment">
                        <div className="form"> 
                            <textarea className="basic_input" value={commentText} onChange={changeCommentText} />
                            <Button text=">" class="bottom_button create_comment_button" onClickFunction={createComment} />
                        </div>
                    </div>
                : <div className="add_comment"></div>}
            </div>
        </div>
    )
}