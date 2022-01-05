import React from 'react'
import './chat.css';
import {useNavigate} from "react-router-dom";
//import {useState, useEffect} from "react";

function eraseCookie(name) {
    document.cookie = name + "=; Max-Age=-99999999;";
}

const Chat = () => {

    let navigate = useNavigate();

    const __handleLogout = async () => {
        localStorage.removeItem("user_id");
        localStorage.removeItem("auth_login");
        localStorage.removeItem("auth_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("access_token");
        eraseCookie("auth_login");
        eraseCookie("token");
        navigate(`/`);
    };

    // useEffect(() => {

    // }, []);

    return (
        <>
            <div >
                <h1 class="text-3xl font-bold underline">MESSENGER</h1>
            </div>
            <div>
                <button onClick={__handleLogout}>Logout</button>
            </div>

        </>
    )
}

export default Chat
