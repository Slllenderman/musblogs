import React, { useEffect } from "react";
import "./Header.scss";
import "../../styles/inputs.scss";
import search_feed from "../../images/header/search_feed.svg";
import notific from "../../images/header/notifications.svg";
import search from "../../images/header/search.svg";
import user_page from "../../images/header/user_page.svg";
import logout from "../../images/header/logout.svg";

export const Header: React.FC = () => {
    return (
        <header>
            <div className="center_content">
                <div>
                    <div className="header_img">
                        <img src={search_feed} alt="search_feed" />
                    </div>
                    <div className="header_img">
                        <img src={notific} alt="notifications" />
                    </div>
                    <div className="search_form">
                        <div>
                            <input 
                                className="search_input"
                                type="text"
                            />
                        </div>
                        <div className="header_img">
                            <img src={search} alt="search" />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="header_img">
                        <img src={user_page} alt="userpage" />
                    </div>
                    <div className="header_img">
                        <img src={logout} alt="logout" />
                    </div>
                </div>
            </div>
        </header>
    )
}