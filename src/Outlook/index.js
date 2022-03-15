import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import "./index.css";
import {PublicClientApplication} from "@azure/msal-browser";
import {MsalProvider} from "@azure/msal-react";
import {msalConfig} from "./authConfig";
import {loginRequest} from "./authConfig";
import {
    useIsAuthenticated,
    useMsal,
} from "@azure/msal-react";

import EmailSidebar from "./EmailSidebar";
import EmailBody from "./EmailBody";
import EmailInfo from "./EmailInfo";

import {getMessages, getMessage, deleteMessage} from "./api/api";

const msalInstance = new PublicClientApplication(msalConfig);

const Email = () => {

    let navigate = useNavigate();
    const {instance, accounts} = useMsal();

    const isAuthenticated = useIsAuthenticated();

    const [messageList, setMessageList] = useState(null);
    const [message, setMessage] = useState(null);

    const [isSigned, setIsSigned] = useState(isAuthenticated);
    const [isLoading, setIsLoading] = useState(null);
    const [isLoadingBody, setIsLoadingBody] = useState(null);
    const [messageID, setMessageID] = useState(null);
    const [openMessage, setOpenMessage] = useState(null);
    const [user, setUser] = useState({
        signInStatus: 'SIGNED_OUT',
        user: null
    });
    const [darkMode, setDarkMode] = useState(false);

    // HANDLE FUNCTIONS
    useEffect(() => {
        if (isAuthenticated) {
            handleGetMessages();
        }

        setDarkMode(localStorage.getItem("dark_mode") === "true");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSigned]);


    const handleGetMessages = () => {
        setIsLoading(true);
        instance
            .acquireTokenSilent({
                ...loginRequest,
                account: accounts[0],
            })
            .then((response) => {
                getMessages(response.accessToken).then((response) => {
                    console.log('response', response);

                    setMessageList(response.value);
                    setIsLoading(false);
                });
            });
    }
    const handleOutlookSignIn = () => {
        instance.loginPopup(loginRequest).then((result) => {
            console.log('handleOutlookSignIn', result);
            setIsSigned(true);
        }).catch(e => {
            console.log(e);
        });

    };

    const handleOutlookSignOut = () => {
        instance.logoutPopup({
            //postLogoutRedirectUri: "/outlook",
            //mainWindowRedirectUri: "/outlook"
        });
        setIsSigned(false);
    };

    const handleMessage = (message_id) => {
        setOpenMessage(true);
        if (messageID !== message_id) {
            setIsLoadingBody(true);
            instance
                .acquireTokenSilent({
                    ...loginRequest,
                    account: accounts[0],
                })
                .then((response) => {
                    getMessage(response.accessToken, message_id).then((response) => {
                        setIsLoadingBody(false);
                        setMessage(response);
                    });
                });
            setMessageID(message_id);
        }
    }

    const handleMessageDelete = (message_id) => {
        instance
            .acquireTokenSilent({
                ...loginRequest,
                account: accounts[0],
            })
            .then((response) => {
                deleteMessage(response.accessToken, message_id).then((response) => {
                    setOpenMessage(false);
                    setMessage(null);
                    handleGetMessages();
                });
            });
    }

    const handleCloseMessage = () => {
        setOpenMessage(false);
    }

    const handleChat = () => {
        navigate(`/chat`);
    }

    const refreshMessages = () => {
        handleGetMessages();
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
                                handleOutlookSignIn={handleOutlookSignIn}
                                handleOutlookSignOut={handleOutlookSignOut}
                                handleChat={handleChat}
                                refreshMessages={refreshMessages}
                            />
                        </div>

                        {/* Messages body */}
                        <EmailBody
                            message={message}
                            handleCloseMessage={handleCloseMessage}
                            isLoadingBody={isLoadingBody}
                            handleMessageDelete={handleMessageDelete}
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


export default function App() {
    return (
        <MsalProvider instance={msalInstance}>
            <Email />
        </MsalProvider>
    );
}