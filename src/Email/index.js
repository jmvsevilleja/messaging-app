import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import "./index.css";

import EmailSidebar from "./EmailSidebar";
import EmailBody from "./EmailBody";
import EmailInfo from "./EmailInfo";

import {signOut, signIn, checkSignInStatus, mountScripts} from "../api/gmail-api";

const Email = () => {
    const [user, setUser] = useState(null);
    const [sign, setSign] = useState(null);
    const [googleUser, setGoogleUser] = useState({
        signInStatus: 'SIGNED_OUT',
        googleUser: undefined
    });
    const [darkMode, setDarkMode] = useState(false);

    const initClient = () => {
        checkSignInStatus()
            .then(onSignInSuccess)
            .catch(_ => {
                setGoogleUser({
                    signInStatus: 'AUTH_FAIL'
                });
            });
    }

    const onSignInSuccess = (googleUser) => {
        console.log(googleUser);
        setGoogleUser({
            signInStatus: 'AUTH_SUCCESS',
            googleUser: googleUser
        });
    }
    // HANDLE FUNCTIONS
    useEffect(() => {
        mountScripts().then(() => {
            window.gapi.load("client:auth2", initClient);
        });

        setDarkMode(localStorage.getItem("dark_mode") === "true");
    }, []);

    const handleSignIn = () => {
        signIn().then(onSignInSuccess);
    };

    const handleSignOut = () => {
        signOut();
    };

    return (
        <div className={"flex h-screen overflow-hidden" + ((darkMode) ? " dark" : "")}>
            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-hidden">
                <main>
                    <div className="relative flex">
                        {/* Messages sidebar */}
                        <div>
                            <EmailSidebar
                                user={user}
                            />
                            <div>
                                <button onClick={handleSignIn}>SignIn Google</button>
                                <button onClick={handleSignOut}>SignOut Google</button>
                                <p> Sign status: {googleUser.signInStatus} </p>
                            </div>
                        </div>

                        {/* Messages body */}
                        <EmailBody
                            user={user}
                        />
                    </div>
                </main>
            </div>
            {false &&
                <EmailInfo
                    user={user}

                />}
        </div>
    );
}

export default Email;
