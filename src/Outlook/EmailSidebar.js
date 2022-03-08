import React from "react";
import Messages from "./Messages";
import GoogleButton from 'react-google-button'
import Nav from "../components/Nav";

function EmailSidebar({
    isSigned,
    isLoading,
    openMessage,
    messageList,
    handleMessage,
    handleGoogleSignIn,
    handleGoogleSignInButton,
    handleGoogleSignOut,
    handleChat
}) {
    return (
        <div
            id="messages-sidebar"
            className={"bg-white dark:bg-slate-900 absolute z-20 top-0 bottom-0 md:static md:top-auto md:bottom-auto md:translate-x-0 transform transition-transform duration-200 ease-in-out w-full md:w-96"
                + (!openMessage ? " translate-x-0" : " -translate-x-full")}
        >
            <div className="justify-between item-center p-5 py-5">
                <div className="flex items-center" >
                    <div className=" font-bold text-gray-600 dark:text-white">Email</div>
                </div>
            </div>
            <div className="px-5"><Nav /></div>
            {!isSigned && <div className="flex flex-col items-center justify-center h-[calc(100vh-130px)]">
                <GoogleButton
                    onClick={handleGoogleSignInButton}
                />
                <div className="m-5 text-base text-gray-600 dark:text-slate-400 text-center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dignissim fermentum dolor, vitae elementum eros mattis ac. Pellentesque semper facilisis libero sed finibus. Nulla facilisi. Mauris convallis interdum ante, vel ornare tellus sollicitudin.
                </div>
                <a className="text-base text-gray-500 hover:text-gray-600" href="/privacy-policy">privacy policy</a>
            </div>}
            {isSigned && isLoading && <div className="flex items-center justify-center h-[calc(100vh-130px)]">
                <div className="text-gray-600 dark:text-slate-400 opacity-50">
                    <svg fill='none' className="w-40 animate-spin m-auto" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                        <path clipRule='evenodd'
                            d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                            fill='currentColor' fillRule='evenodd' />
                    </svg></div></div>}
            {isSigned && !isLoading && <div className="scrollable px-5 overflow-x-hidden overflow-y-auto shrink-0 h-[calc(100vh-130px)] w-full md:w-96">
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
