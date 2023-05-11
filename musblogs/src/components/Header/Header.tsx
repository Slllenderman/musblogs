import React, { useEffect } from "react";
import "./Header.scss";
import "../../styles/inputs.scss";
import { headerImages } from "../../images/images";
import { ImageDiv, Input } from "../BasicComponents/BasicComponents";
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
                    <ImageDiv class="header_img" src={headerImages.search_feed} alt="search_feed" onClickFunction={goToMainPage} />
                    <ImageDiv class="header_img" src={headerImages.notifications} alt="notifications" />
                    <div className="search_form">
                        <div>
                            <Input 
                                class="search_input"
                                type="text"
                            />
                        </div>
                        <ImageDiv class="header_img" src={headerImages.search} alt="search" />
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