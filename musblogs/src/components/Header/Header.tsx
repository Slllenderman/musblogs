import React, { useState, useEffect, ReactHTMLElement } from "react";
import "./Header.scss";
import "../../styles/inputs.scss";
import { headerImages } from "../../images/images";
import { ImageDiv, Input } from "../BasicComponents/BasicComponents";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store";
import { postFeedFetchingSearch } from "../../store/reducers/postFeedSlice";

export const Header: React.FC = () => {

    const dispatch = useAppDispatch()
    const [ editSearch, setEditSearh ] = useState("");
    const { token, user } = useAppSelector((state) => state.userInfoReducer)
    const navigate = useNavigate();

    useEffect(() => {
        if (token.auth_token == "")
            navigate("/login")
    }, [])

    const changeEditSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditSearh(e.target.value)
    }

    const onKeyDown = (e: any) => {
        if (e.keyCode === 13)
            dispatch(postFeedFetchingSearch(editSearch))
    }

    const onSearchClick = (e: any) => {
        dispatch(postFeedFetchingSearch(editSearch))
    }

    const goToMainPage = (e: any) => {
        navigate("/")
    }

    const goToUserPage = (e: any) => {
        navigate("/userpage")
    }

    const goToLogin = (e: any) => {
        navigate("/login")
    }

    return (
        <header>
            <div className="center_content">
                <div>
                    <ImageDiv class="header_img" src={headerImages.search_feed} alt="search_feed" onClickFunction={goToMainPage} />
                    <ImageDiv class="header_img" src={headerImages.notifications} alt="notifications" />
                    <div className="search_form" onKeyDown={onKeyDown}>
                        <div>
                            <Input 
                                class="search_input"
                                type="text"
                                text={editSearch}
                                onChangeFunction={changeEditSearch}
                            />
                        </div>
                        <ImageDiv class="header_img" src={headerImages.search} alt="search" onClickFunction={onSearchClick} />
                    </div>
                </div>
                <div>
                    <ImageDiv class="header_img" src={headerImages.user_page} alt="userpage" onClickFunction={goToUserPage} />
                    <ImageDiv class="header_img" src={headerImages.logout} alt="logout" onClickFunction={goToLogin} />
                </div>
            </div>
        </header>
    )
}