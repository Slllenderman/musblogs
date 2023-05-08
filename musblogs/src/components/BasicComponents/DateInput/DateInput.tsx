import React, { useState } from "react";
import "./DateInput.scss";
import "../../../styles/inputs.scss";
import calendar from "../../../images/form_toolkit/calendar.svg";
import { ImageDiv } from "../ImageDiv/ImageDiv";
import { Input } from "../Input/Input";

export const DateInput: React.FC = () => {

    const [date, setDate] = useState(Date());

    const GetFullForm = (element: number, size: number) => {
        let space = "0"
        let str_el = element.toString()
        if (str_el.length < size)
            return space.repeat(size - str_el.length) + str_el
        if (str_el.length === size)
            return str_el
        return ""
    }

    const GetStringDate = (date: Date) => {
        return GetFullForm(date.getDay(), 2) + "." + GetFullForm(date.getMonth(), 2) + "." + GetFullForm(date.getFullYear(), 4)
    }

    return (
        <div className="calendar basic_input">
            <div className="content">
                <ImageDiv src={calendar} class="date_img" alt="calendar" />
                <div className="date_input">
                    <Input type="text" placeholder="дд.мм.гггг" />
                </div>
            </div>
        </div>
    )
}