import React from "react";
import "./Checkbox.scss";
import "../../../styles/inputs.scss";
import { CheckboxProps } from "../../../Types/BasicElements";
import check from "../../../images/form_toolkit/check.svg";

export const Checkbox: React.FC<CheckboxProps> = ({...props}) => {
    return (
        <div className={"checkbox basic_input need " + props.class} onClick={props.onClickFunction}>
            {props.value ? <img src={check} alt="check" className="checkbox_img" /> : <div className="checkbox_img"></div>}
        </div>
    )
}