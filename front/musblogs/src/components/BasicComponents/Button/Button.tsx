import React from "react";
import { ButtonProps } from "../../../Types/BasicElements";

export const Button: React.FC<ButtonProps> = ({...button}) => {
    return (
        <div className={button.class} onClick={button.onClickFunction}>
            {button.text}
        </div>
    )
}