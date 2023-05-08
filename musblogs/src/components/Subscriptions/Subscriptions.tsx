import React, { useState, useEffect } from "react";
import "./Subscriptions.scss";
import "../../styles/buttons.scss";
import "../../styles/inputs.scss";
import "../../styles/names.scss";
import { UserLine } from "../UserLine/UserLine";
import { UserProps } from "../../Types/DataBase";
import { GoBackLine } from "../GoBackLine/GoBackLine";
import { Button } from "../BasicComponents/Button/Button";

export const Subscriptions: React.FC = () => {

    const [users, setUsers] = useState<Array<UserProps>>([]);

    useEffect(() => {
        setUsers([
            {
                id: 1,
                firstname: "Firstname", 
                lastname: "Lastname",
                login: "nick1",
                avatar: ""
            },
            {
                id: 2,
                firstname: "Firstname", 
                lastname: "Lastname",
                login: "nick2",
                avatar: ""
            },
            {
                id: 3,
                firstname: "Firstname", 
                lastname: "Lastname",
                login: "nick3",
                avatar: ""
            }, 
            {
                id: 4,
                firstname: "Firstname", 
                lastname: "Lastname",
                login: "nick4",
                avatar: ""
            }
        ])
    }, [])

    return (
        <div className="feed">
            <GoBackLine />
            <div className="subscriptions">
                <div className="subs_info black_big_header">
                    Подписки ({users.length})
                </div>
                <div className="users">
                    {users.map((user: UserProps, index: number) => {
                        return (
                            <div className="subscription">
                                <UserLine {...user} />
                                <Button text="Отписаться" class="basic_button" />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}