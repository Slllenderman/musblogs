import React, { useState, useEffect } from "react";
import "./Subscriptions.scss";
import "../../styles/buttons.scss";
import "../../styles/inputs.scss";
import "../../styles/names.scss";
import { UserLine } from "../UserLine/UserLine";
import { UserProps } from "../../Types/DataBase";
import { GoBackLine } from "../GoBackLine/GoBackLine";
import { Button } from "../BasicComponents/BasicComponents";
import { infSubs } from "../../store/infinity";

export const Subscriptions: React.FC = () => {

    const [users, setUsers] = useState<Array<UserProps>>([]);

    useEffect(() => {
        setUsers([...infSubs])
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