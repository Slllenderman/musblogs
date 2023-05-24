import React, {useState, useEffect} from "react";
import "./NewPost.scss";
import "../../styles/buttons.scss";
import "../../styles/inputs.scss";
import "../../styles/names.scss";
import { GoBackLine } from "../GoBackLine/GoBackLine";
import { Button } from "../BasicComponents/BasicComponents";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store";
import axios from "axios";
import { postsUrl, tokenName } from "../../urls/bdUrls";
import Cookies from 'universal-cookie';

export const NewPost: React.FC = () => {

    const navigate = useNavigate();
    const cookies = new Cookies();
    const {user, token} = useAppSelector((state) => state.userInfoReducer)
    const [postText, setPostText] = useState("");

    useEffect(() => {
        if (!cookies.get('auth_token'))
            navigate("/login")
    }, [user, token])

    const goBack = (e: any) => {
        navigate("/userpage")
    }

    const changePostText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPostText(e.target.value)
    }

    const createPost = (e: any) => {
        if (cookies.get('auth_token')) {
            const postProps = { content: postText, user_id: user.id }
            axios.post(postsUrl, {...postProps}, {headers: {
                'Content-Type': 'application/json',
                'Authorization': tokenName + ' ' + cookies.get('auth_token'),
            }})
            .then((response) => {
                console.log(response)
                const postId = response.data.id
                navigate("/post/" + postId)
            })
            .catch((error: any) => {
                console.log(tokenName + ' ' + cookies.get('auth_token'))
                console.log(error)
                console.log(error.message)
            })
        }
    }

    return (
        <div className="feed">
            <GoBackLine onClickFunction={goBack} />
            <div className="create_post">
                <div className="desc_name">
                    Напишите что-нибудь
                </div>
                <div className="form"> 
                    <textarea className="basic_input" value={postText} onChange={changePostText} />
                    <Button text=">" class="bottom_button create_post_button" onClickFunction={createPost} />
                </div>
            </div>
        </div>
    )
}