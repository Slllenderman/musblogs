import React from "react";
import "./Login.scss"
import "../../styles/names.scss";
import "../../styles/inputs.scss";
import "../../styles/buttons.scss";
import "../../styles/hrefs.scss";
import { guestPage } from "../../images/images";
import { ImageDiv, Input, Button, Href } from "../BasicComponents/BasicComponents";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {

    const navigate = useNavigate();

    const goToRegistration = (e: any) => {
        navigate("/registration")
    }

    const login = (e: any) => {
        navigate("/userpage")
    }

    return (
        <div className="login">
            <ImageDiv class="card" src={guestPage.guest_page} alt="welcome" />
            <div className="card login_form">
                <div className="form_header">
                </div>
                <div className="form_inputs">
                    <div className="basic_header log">Вход</div>
                    <div>
                        <Input type="text" class="basic_input" />
                    </div>
                    <div>
                        <Input type="password" class="basic_input" />
                    </div>
                </div>
                <div className="form_links">
                    <Button text=">" class="basic_button" onClickFunction={login} />       
                    <div>
                        <Href text="Регистрация" class="basic_href" onClickFunction={goToRegistration}/>
                    </div> 
                </div>
            </div>
        </div>
    )
}