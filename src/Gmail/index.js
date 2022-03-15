import React, {useEffect, useState} from "react";
import "./index.css";

import EmailSidebar from "./EmailSidebar";
import EmailBody from "./EmailBody";
import EmailInfo from "./EmailInfo";

import {signOut, signIn, checkSignInStatus, mountScripts} from "./api/api";
import {getMessages, getMessage} from "./api/api";

const Email = () => {

    const [messageList, setMessageList] = useState(null);
    const [message, setMessage] = useState(null);

    const [isSigned, setIsSigned] = useState(true);
    const [isLoading, setIsLoading] = useState(null);
    const [isLoadingBody, setIsLoadingBody] = useState(null);
    const [messageID, setMessageID] = useState(null);
    const [openMessage, setOpenMessage] = useState(null);
    const [user, setUser] = useState({
        signInStatus: 'SIGNED_OUT',
        user: null
    });
    const [darkMode, setDarkMode] = useState(false);

    const initClient = () => {
        checkSignInStatus()
            .then(onSignInSuccess)
            .catch(_ => {
                setIsSigned(false);
            });
    }
    const onDeleteSuccess = (user) => {
        //console.log('user', user);
        setOpenMessage(false);
        setMessage(null);
        onSignInSuccess();
    }
    const onSignInSuccess = (user) => {
        //console.log('user', user);
        setUser({
            signInStatus: 'AUTH_SUCCESS',
            user: user
        });

        setIsSigned(true);
        setIsLoading(true);
        getMessages(null, 100).then((result) => {
            setMessageList(result);
            setIsLoading(false);
        });
    }

    // HANDLE FUNCTIONS
    useEffect(() => {
        mountScripts().then(() => {
            window.gapi.load("client:auth2", initClient);
        });

        setDarkMode(localStorage.getItem("dark_mode") === "true");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleGoogleSignInButton = () => {
        signIn().then(onSignInSuccess);
    };

    const handleGoogleSignOut = () => {
        signOut().then(() => {
            setMessage(null);
            setOpenMessage(false);
            setIsSigned(false);
        });
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

    const refreshMessages = () => {
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
                                handleGoogleSignInButton={handleGoogleSignInButton}
                                handleGoogleSignOut={handleGoogleSignOut}
                                refreshMessages={refreshMessages}
                            />
                        </div>

                        {/* Messages body */}
                        <EmailBody
                            message={message}
                            handleCloseMessage={handleCloseMessage}
                            isLoadingBody={isLoadingBody}
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
