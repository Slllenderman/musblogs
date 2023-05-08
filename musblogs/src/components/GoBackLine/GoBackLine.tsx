import React from "react";
import "./GoBackLine.scss";

export const GoBackLine: React.FC = () => {
    return (
        <div className="go_back_line">
            <div className="go_back_img">
                <svg width="45" height="24" viewBox="0 0 45 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.00127 11.5592C0.9843 11.1373 1.13689 10.7097 1.45904 10.3876L10.3876 1.45904C10.9997 0.846986 11.992 0.846986 12.604 1.45904C13.2161 2.0711 13.2161 3.06343 12.604 3.67549L6.35869 9.92084L42.4456 10.2166C43.3111 10.2237 44.007 10.9311 43.9999 11.7967C43.9929 12.6622 43.2854 13.3582 42.4199 13.3511L6.21542 13.0543L12.604 19.4429C13.2161 20.055 13.2161 21.0473 12.604 21.6594C11.992 22.2714 10.9997 22.2714 10.3876 21.6594L1.45904 12.7308C1.13689 12.4087 0.9843 11.9812 1.00127 11.5592Z" fill="white" stroke="white" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </div>
        </div>
    )
}