import React from "react";
import "./Input.scss";
import { InputProps } from "../../../Types/BasicElements";

export const Input: React.FC<InputProps> = ({...input}) => {
    return (
        <input 
            value={input.text}
            type={input.type}
            placeholder={input.placeholder}
            className={input.class + " component_input"}
            onChange={input.onChangeFunction}
        />
    )
}