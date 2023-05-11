import React, { useState, useEffect } from "react";
import "./Subscribers.scss";
import "../../styles/buttons.scss";
import "../../styles/inputs.scss";
import "../../styles/names.scss";
import { GoBackLine } from "../GoBackLine/GoBackLine";
import { UserProps } from "../../Types/DataBase";
import { UserLine } from "../UserLine/UserLine";
import { infSubs } from "../../store/infinity";

export const Subscribers: React.FC = () => {

    const [users, setUsers] = useState<Array<UserProps>>([]);

    useEffect(() => {
        setUsers([...infSubs])
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