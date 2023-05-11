import React, { useState } from "react";
import "./Settings.scss";
import "../../styles/buttons.scss";
import "../../styles/inputs.scss";
import "../../styles/names.scss";
import { userToolkit, formToolkit } from "../../images/images";
import { ImageDiv, Button, Input, DateInput, Checkbox } from "../BasicComponents/BasicComponents";

export const Settings: React.FC = () => {

    const [showRegistration, setShowingReg] = useState(formToolkit.showing);
    const [showBirthday, setShowingBirthday] = useState(formToolkit.showing);
    const [getNote, setNote] = useState(true);

    const changeShowingReg = (e: any) => {
        if (showRegistration === formToolkit.showing)
            setShowingReg(formToolkit.not_showing)
        else
            setShowingReg(formToolkit.showing)
    }

    const changeShowingBirthday = (e: any) => {
        if (showBirthday === formToolkit.showing)
            setShowingBirthday(formToolkit.not_showing)
        else
            setShowingBirthday(formToolkit.showing)
    }

    const changeNote = (e: any) => {
        setNote(!getNote);
    }

    return (
        <div className="feed">
            <div className="top_shadow"></div>
            <div className="feed_content">
                <div className="top_options">
                    <ImageDiv src={formToolkit.go_back} class="set_img first" alt="go_back" />
                    <div className="set_img center">
                        <svg width="61" height="63" viewBox="0 0 61 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M53.8208 34.426C53.9515 33.4461 54.0168 32.4336 54.0168 31.3557C54.0168 30.3106 53.9515 29.2654 53.7882 28.2855L60.4186 23.1249C61.0065 22.6676 61.1698 21.7857 60.8106 21.1325L54.5394 10.2886C54.1475 9.57003 53.3309 9.3414 52.6123 9.57003L44.8061 12.7056C43.1729 11.4644 41.4418 10.4193 39.5148 9.63536L38.3389 1.33915C38.2083 0.555257 37.555 0 36.7711 0H24.2288C23.445 0 22.8244 0.555257 22.6937 1.33915L21.5179 9.63536C19.5908 10.4193 17.827 11.4971 16.2266 12.7056L8.42033 9.57003C7.70176 9.30874 6.8852 9.57003 6.49325 10.2886L0.254767 21.1325C-0.13718 21.8184 -0.00653168 22.6676 0.646713 23.1249L7.27715 28.2855C7.11384 29.2654 6.98319 30.3432 6.98319 31.3557C6.98319 32.3683 7.04851 33.4461 7.21182 34.426L0.581389 39.5866C-0.00653164 40.0439 -0.169842 40.9258 0.189442 41.579L6.46059 52.4229C6.85254 53.1415 7.66909 53.3701 8.38766 53.1415L16.1939 50.0059C17.827 51.247 19.5581 52.2922 21.4852 53.0761L22.6611 61.3723C22.8244 62.1562 23.445 62.7115 24.2288 62.7115H36.7711C37.555 62.7115 38.2083 62.1562 38.3063 61.3723L39.4821 53.0761C41.4092 52.2922 43.1729 51.247 44.7734 50.0059L52.5797 53.1415C53.2982 53.4028 54.1148 53.1415 54.5067 52.4229L60.7779 41.579C61.1698 40.8605 61.0065 40.0439 60.3859 39.5866L53.8208 34.426ZM30.5 43.1141C24.0329 43.1141 18.7416 37.8229 18.7416 31.3557C18.7416 24.8886 24.0329 19.5973 30.5 19.5973C36.9671 19.5973 42.2584 24.8886 42.2584 31.3557C42.2584 37.8229 36.9671 43.1141 30.5 43.1141Z"/>
                        </svg>
                    </div>
                    <div className="set_img last"></div>
                </div>
                <div className="changing">
                    <div className="top_changing">
                        <ImageDiv class="ch_avatar" src={userToolkit.avatar} alt="avatar" />
                        <div className="top_inputs">
                            <div className="reg_form">
                                <div className="desc_name">
                                    Регистрация: г.
                                </div>
                                <ImageDiv src={showRegistration} class="reg_img showing" alt="showing" onClickFunction={changeShowingReg} />
                            </div>
                            <div><Input class="basic_input" type="text" placeholder="Имя" /></div>
                            <div><Input class="basic_input" type="text" placeholder="Фамилия" /></div>
                            <div><Input class="basic_input" type="text" placeholder="Логин" /></div>
                        </div>
                    </div>
                    <div className="center_changing">
                        <div className="input"><Input class="basic_input need" type="text" placeholder="Телефон" /></div>
                        <div className="input"><Input class="basic_input need" type="text" placeholder="Почта" /></div>
                        <div className="img_input">
                            <ImageDiv src={userToolkit.link} class="img_div" alt="link" />
                            <div className="input_div"><Input class="basic_input" type="text" placeholder="Ссылка на ресурс" /></div>
                        </div>
                        <div className="img_input">
                            <ImageDiv src={userToolkit.location} class="img_div" alt="location" />
                            <div className="input_div"><Input class="basic_input" type="text" placeholder="Локация" /></div>
                        </div>
                    </div>
                    <div className="birthday">
                        <div className="birthday_form">
                            <div className="name">День рождения: </div>
                            <div><DateInput /></div>
                        </div>
                        <div className="change_note">
                            <div className="note other_info_name">
                                Выводить предупреждение о дне рождении за 2 недели
                            </div>
                            <Checkbox value={getNote} onClickFunction={changeNote} />
                        </div>
                        <ImageDiv class="showing" src={showBirthday} alt="showing" onClickFunction={changeShowingBirthday} />
                    </div>
                    <div className="description">
                        <div>Описание:</div>
                        <div className="text">
                            <textarea className="basic_input">
                            </textarea>
                        </div>
                    </div>
                    <div className="save_button">
                        <Button text="Сохранить изменение" class="basic_button" />
                    </div>
                </div>
            </div>
        </div>
    )
}