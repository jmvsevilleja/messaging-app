import React from "react";
import Messages from "./Messages";
import GoogleButton from 'react-google-button'
import Nav from "../components/Nav";
import ConvoLogo from '../logo.svg';
import MessageCreate from './MessageCreate';

function EmailSidebar({
    isSigned,
    isLoading,
    openMessage,
    messageList,
    handleMessage,
    handleGoogleSignInButton,
    handleGoogleSignOut,
    refreshMessages
}) {
    return (
        <div
            id="messages-sidebar"
            className={"bg-white dark:bg-slate-900 absolute z-20 top-0 bottom-0 md:static md:top-auto md:bottom-auto md:translate-x-0 transform transition-transform duration-200 ease-in-out w-full md:w-96"
                + (!openMessage ? " translate-x-0" : " -translate-x-full")}
        >
            <div className="flex justify-between item-center p-5 py-5">
                <div className="flex items-center" >
                    <div className=" font-bold text-gray-600 dark:text-white">Gmail</div>
                </div>
                {isSigned && <button type="button"
                    onClick={handleGoogleSignOut}
                    title="Sign Out"
                    className="text-gray-400 hover:text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                </button>}
            </div>
            < div className="px-5"><Nav /></div>
            {!isSigned && <div className="flex flex-col items-center justify-center h-[calc(100vh-130px)]">
                <div className="my-10">
                    <img className="w-60 mx-5" src={ConvoLogo} alt="Conva" />
                </div>
                <div className="text-gray-600 dark:text-slate-400">
                    Welcome to Conva!
                </div>
                <div className="m-5 text-sm text-gray-600 dark:text-slate-400 text-center">
                    Access your accounts anytime, anywhere! Monitor your emails by reading, replying, and communicate with multimedia content.
                    <br /><br />With convenience and efficiency, experience the latest features of managing your emails on the go.
                </div>
                <GoogleButton
                    onClick={handleGoogleSignInButton}
                />
                <div className="m-5 text-sm font-base text-black dark:text-slate-400">
                    Read our&nbsp;
                    <a className="mt-5 text-primary hover:text-secondary" href="/privacy-policy">Privacy policy</a>
                    &nbsp;and the&nbsp;
                    <a className="mt-5 text-primary hover:text-secondary" href="/terms-and-condition">Terms of service</a>
                </div>
            </div>}
            {isSigned && isLoading && <div className="flex items-center justify-center h-[calc(100vh-130px)]">
                <div className="text-gray-600 dark:text-slate-400 opacity-50">
                    <svg fill='none' className="w-40 animate-spin m-auto" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                        <path clipRule='evenodd'
                            d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                            fill='currentColor' fillRule='evenodd' />
                    </svg></div></div>}
            {isSigned && !isLoading && <div className="flex justify-center mb-3 px-5">
                <div className="w-full flex justify-center items-center">
                    <MessageCreate />
                </div>
                <div className="flex items-center">
                    <button className="text-gray-400 hover:text-gray-500"
                        title="Refresh"
                        onClick={refreshMessages}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>}
            {isSigned && !isLoading && <div className="scrollable px-5 overflow-x-hidden overflow-y-auto shrink-0 h-[calc(100vh-160px)] w-full md:w-96">

                <ul>
                    {messageList && messageList.length !== 0 && messageList
                        .map((message) => (<li key={message.result.id}>
                            <Messages
                                message={message}
                                handleEmail={() => {
                                    handleMessage(message.result.id)
                                }}
                            />
                        </li>
                        ))}
                </ul>
            </div>}

        </div >
    )
}

export default EmailSidebar
