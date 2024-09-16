import React from "react";
import { ImageDivProps } from "../../../Types/BasicElements";

export const ImageDiv: React.FC<ImageDivProps> = ({...image_div}) => {
    return (
        <div className={image_div.class} onClick={image_div.onClickFunction}>
            <img src={image_div.src} alt={image_div.alt} />
        </div>
    )
}