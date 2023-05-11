import React, { useState } from "react";
import "./Registration.scss";
import "../../styles/names.scss";
import "../../styles/buttons.scss";
import { userToolkit } from "../../images/images";
import { ImageDiv, Input, Password, DateInput, Button } from "../BasicComponents/BasicComponents";
import { useNavigate } from "react-router-dom";

export const Registration: React.FC = () => {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [login, setLogin] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user_avatar, setAvatar] = useState("");

    const registration = (e: any) => {
        navigate("/userpage");
    }

    const changeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value)
    }

    const changeSecondName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSecondName(e.target.value)
    }

    const changeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value)
    }

    const changePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value)
    }

    const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    return (
        <div className="registration">
            <div className="basic_header">
                Регистрация
            </div>
            <div className="not_needed">
                <ImageDiv src={userToolkit.avatar} alt="avatar" class="avatar" />
                <div className="change_form">
                    <div className="fl_name option">
                        <div><Input class="basic_input" type="text" placeholder="Имя" onChangeFunction={changeFirstName} /></div>
                        <div><Input class="basic_input" type="text" placeholder="Фамилия" onChangeFunction={changeSecondName} /></div>
                    </div>
                    <div className="option">
                        <Input class="basic_input" type="text" placeholder="Логин" onChangeFunction={changeLogin}/>
                    </div>
                    <div className="option"><DateInput /></div>
                </div>
            </div>
            <div className="needed">
                <div className="option">
                    <Input class="basic_input need" type="text" placeholder="Телефон" onChangeFunction={changePhone} />
                </div>
                <div className="option">
                    <Input class="basic_input need" type="text" placeholder="Почта" onChangeFunction={changeEmail} />
                </div>
                <div className="option"><Password class="need" onChangeFunction={changePassword} /></div>
                <div className="option">
                    <Input class="basic_input need" type="text" />
                </div>
            </div>
            <div className="go_to_reg">
                <div className="error"></div>
                <Button text=">" class="basic_button button" onClickFunction={registration} />
            </div>
        </div>
    )
}