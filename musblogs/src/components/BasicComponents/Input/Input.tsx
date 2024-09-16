import React, { useState } from "react";
import "./Input.scss";
import { InputProps } from "../../../Types/BasicElements";

export const Input: React.FC<InputProps> = ({...input}) => {

    const [textValue, setTextValue] = useState(input.text);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextValue(e.target.value)
        if (input.onChangeFunction)
            input.onChangeFunction(e)
    }

    return (
        <input 
            value={textValue}
            type={input.type}
            placeholder={input.placeholder}
            className={input.class + " component_input"}
            onChange={handleInputChange}
        />
    )
}