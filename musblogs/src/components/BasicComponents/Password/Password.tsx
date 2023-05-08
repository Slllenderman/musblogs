import React, { useState } from "react";
import "./Password.scss";
import "../../../styles/inputs.scss";
import showing from "../../../images/form_toolkit/showing.svg";
import not_showing from "../../../images/form_toolkit/not_showing.svg";
import { ImageDiv } from "../ImageDiv/ImageDiv";
import { Input } from "../Input/Input";
import { PasswrodProps } from "../../../Types/BasicElements";

export const Password: React.FC<PasswrodProps> = ({...props}) => {

    const [visible, setVisible] = useState(not_showing);
    const [type, setType] = useState("password");

    const changeVisible = (e: any) => {
        if (visible === not_showing) {
            setVisible(showing)
            setType("text")
        }
        else {
            setVisible(not_showing)
            setType("password")
        }
    }

    return (
        <div className={"password basic_input " + props.class}>
            <div className="passw_input">
                <Input type={type} placeholder={props.placeholder} onChangeFunction={props.onChangeFunction} class={props.class} />
            </div>
            <ImageDiv class="passw_img" src={visible} alt={visible} onClickFunction={changeVisible} />
        </div>
    )
}