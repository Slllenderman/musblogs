import React, { useEffect, useState } from "react";
import "./Login.scss"
import "../../styles/names.scss";
import "../../styles/inputs.scss";
import "../../styles/buttons.scss";
import "../../styles/hrefs.scss";
import { guestPage } from "../../images/images";
import { ImageDiv, Input, Button, Href, Password } from "../BasicComponents/BasicComponents";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/actions/getUserInfo";
import { useAppDispatch, useAppSelector } from "../../store";

export const Login: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { token } = useAppSelector((state) => state.userInfoReducer)

    const [editUsername, setEditUsername]  = useState("")
    const [editPasswrod, setEditPassword] = useState("")

    const goToRegistration = (e: any) => {
        navigate("/registration")
    }

    useEffect(() => {
        if (token.auth_token != "")
            navigate('/userpage')
    }, [token])

    const changeEditUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditUsername(e.target.value)
    }

    const changeEditPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditPassword(e.target.value)
    }

    const onKeyDown = (e: any) => {
        if (e.keyCode === 13)
            dispatch(login({username: editUsername, password: editPasswrod}))
    }

    const clickButton = (e: any) => {
        dispatch(login({username: editUsername, password: editPasswrod}))
    }

    return (
        <div className="login">
            <ImageDiv class="card" src={guestPage.guest_page} alt="welcome" />
            <div className="card login_form" onKeyDown={onKeyDown}>
                <div className="form_header">
                </div>
                <div className="form_inputs">
                    <div className="basic_header log">Вход</div>
                    <div>
                        <Input type="text" class="basic_input" onChangeFunction={changeEditUsername} />
                    </div>
                    <div>
                        <Password class="passw_input" onChangeFunction={changeEditPassword} /> 
                    </div>
                </div>
                <div className="form_links">
                    <Button text=">" class="basic_button" onClickFunction={clickButton} />       
                    <div>
                        <Href text="Регистрация" class="basic_href" onClickFunction={goToRegistration}/>
                    </div> 
                </div>
            </div>
        </div>
    )
}