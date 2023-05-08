import React, { useState, useEffect } from "react";
import "./Subscribers.scss";
import "../../styles/buttons.scss";
import "../../styles/inputs.scss";
import "../../styles/names.scss";
import { GoBackLine } from "../GoBackLine/GoBackLine";
import { UserProps } from "../../Types/DataBase";
import { UserLine } from "../UserLine/UserLine";

export const Subscribers: React.FC = () => {

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
            <div className="subscribers">
                <div className="subs_info black_big_header">
                    Подписчики ({users.length})
                </div>
                <div className="users">
                    {users.map((user: UserProps, index: number) => {
                        return (
                            <UserLine {...user} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}