import React from "react";
import { HrefProps } from "../../../Types/BasicElements";

export const Href: React.FC<HrefProps> = ({...href}) => {
    return (
        <span className={href.class} onClick={href.onClickFunction}>
            {href.text}
        </span>
    )
}