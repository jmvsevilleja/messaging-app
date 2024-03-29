import React, {useEffect, useState} from "react";
import "./index.css";

import EmailSidebar from "./EmailSidebar";
import EmailBody from "./EmailBody";
import EmailInfo from "./EmailInfo";

import {getMessages, getMessage} from "./api/api";

const Email = () => {

    const [messageList, setMessageList] = useState(null);
    const [message, setMessage] = useState(null);

    const [isSigned, setIsSigned] = useState(false);
    const [isLoading, setIsLoading] = useState(null);
    const [isLoadingBody, setIsLoadingBody] = useState(null);
    const [messageID, setMessageID] = useState(null);
    const [openMessage, setOpenMessage] = useState(null);
    const [user, setUser] = useState({
        signInStatus: 'SIGNED_OUT',
        user: null
    });
    const [darkMode, setDarkMode] = useState(false);

    const onSignInSuccess = () => {
        //console.log('user', user);
        setUser({
            signInStatus: 'AUTH_SUCCESS',
            user: user
        });

        setIsSigned(true);
        setIsLoading(true);
        getMessages().then((result) => {
            //console.log('getMessages', result);
            setMessageList(result);
            setIsLoading(false);
        });

    }

    // HANDLE FUNCTIONS
    useEffect(() => {
        const secret = localStorage.getItem("icloud");
        if (secret) {
            onSignInSuccess();
        }
        setDarkMode(localStorage.getItem("dark_mode") === "true");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleIcloudSignIn = () => {
        const secret = localStorage.getItem("icloud");
        if (secret) {
            onSignInSuccess();
        }
    };

    const handleIcloudSignOut = () => {
        localStorage.removeItem("icloud");
        setOpenMessage(false);
        setIsLoadingBody(false);
        setMessage(null);
        setIsSigned(false);
    };

    const handleMessage = (message_id) => {
        setOpenMessage(true);
        if (messageID !== message_id) {
            setIsLoadingBody(true);
            getMessage(message_id).then((result) => {
                setIsLoadingBody(false);
                setMessage(result);
            });
            setMessageID(message_id);
        }
    }
    const handleCloseMessage = () => {
        setOpenMessage(false);
    }
    const handleBodyLoading = () => {
        setIsLoadingBody(true);
    }
    const refreshMessages = () => {
        onSignInSuccess();
    }

    const onDeleteSuccess = () => {
        setOpenMessage(false);
        setMessage(null);
        setIsLoadingBody(false);
        onSignInSuccess();
    }
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
                                isLoading={isLoading}
                                openMessage={openMessage}
                                messageList={messageList}
                                isSigned={isSigned}
                                handleMessage={handleMessage}
                                handleIcloudSignIn={handleIcloudSignIn}
                                handleIcloudSignOut={handleIcloudSignOut}
                                refreshMessages={refreshMessages}
                            />
                        </div>

                        {/* Messages body */}
                        <EmailBody
                            message={message}
                            handleCloseMessage={handleCloseMessage}
                            isLoadingBody={isLoadingBody}
                            handleBodyLoading={handleBodyLoading}
                            onDeleteSuccess={onDeleteSuccess}
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
