import React, { useEffect } from "react";
import "./Header.scss";
import "../../styles/inputs.scss";
import search_feed from "../../images/header/search_feed.svg";
import notific from "../../images/header/notifications.svg";
import search from "../../images/header/search.svg";
import user_page from "../../images/header/user_page.svg";
import logout from "../../images/header/logout.svg";

import { ImageDiv } from "../BasicComponents/ImageDiv/ImageDiv";
import { Input } from "../BasicComponents/Input/Input";
import { useNavigate } from "react-router-dom";

export const Header: React.FC = () => {

    const navigate = useNavigate();

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
                    <ImageDiv class="header_img" src={search_feed} alt="search_feed" onClickFunction={goToMainPage} />
                    <ImageDiv class="header_img" src={notific} alt="notifications" />
                    <div className="search_form">
                        <div>
                            <Input 
                                class="search_input"
                                type="text"
                            />
                        </div>
                        <ImageDiv class="header_img" src={search} alt="search" />
                    </div>
                </div>
                <div>
                    <ImageDiv class="header_img" src={user_page} alt="userpage" onClickFunction={goToUserPage} />
                    <ImageDiv class="header_img" src={logout} alt="logout" onClickFunction={goToLogin} />
                </div>
            </div>
        </header>
    )
}