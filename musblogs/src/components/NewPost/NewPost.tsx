import React from "react";
import "./NewPost.scss";
import "../../styles/buttons.scss";
import "../../styles/inputs.scss";
import "../../styles/names.scss";
import { GoBackLine } from "../GoBackLine/GoBackLine";
import { Button } from "../BasicComponents/BasicComponents";

export const NewPost: React.FC = () => {
    return (
        <div className="feed">
            <GoBackLine />
            <div className="create_post">
                <div className="desc_name">
                    Напишите что-нибудь
                </div>
                <div className="form"> 
                    <textarea className="basic_input"></textarea>
                    <Button text=">" class="bottom_button create_post_button" />
                </div>
            </div>
        </div>
    )
}