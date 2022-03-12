import React, {useEffect, useState} from "react";

import ConvoLogo from '../logo.svg';

import ReplyMessage from './ReplyMessage';

function EmailBody({
    message,
    handleCloseMessage,
    handleEmailReply,
    isLoadingBody
}) {

    const iframeRef = React.useRef(null);
    const [messageTitle, setMessageTitle] = useState("");
    const [messageSubTitle, setMessageSubTitle] = useState("");

    useEffect(() => {
        if (message) {
            const {body} = iframeRef.current.contentWindow.document;
            body.style.margin = "0px";
            body.style.fontFamily = "Arial, Helvetica, sans-serif";
            body.style.fontSize = "13px";
            body.innerHTML = message.body + '<base target="_blank">';
            const subject = message.result.messageHeaders.find((item) => item.name === 'Subject').value;
            const from = message.result.messageHeaders.find((item) => item.name === 'From').value;
            //console.log(message);
            setMessageTitle(subject)
            setMessageSubTitle(from)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message]);

    return (
        <div
            className="bg-white dark:bg-slate-900 grow flex flex-col md:translate-x-0 transform transition-transform duration-200 ease-in-out h-screen overflow-hidden border-0 md:border-l border-gray-200 dark:border-gray-500"
        >
            {isLoadingBody && (
                <div className="h-screen w-full flex flex-col justify-center items-center p-2">
                    <div className=" text-primary opacity-50"><svg fill='none' className="w-40 animate-spin m-auto" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                        <path clipRule='evenodd'
                            d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                            fill='currentColor' fillRule='evenodd' />
                    </svg></div>
                </div>
            )}
            {!isLoadingBody && !message && (
                <div className="h-screen w-full flex flex-col justify-center items-center p-2">
                    <div className="">
                        <img className="w-96" src={ConvoLogo} alt="Conva" />
                    </div>
                </div>
            )}
            {!isLoadingBody && message && <div className="w-full h-full flex flex-col overflow-hidden">
                <div className="justify-between item-center border-b border-gray-300 dark:border-gray-500 p-3 xs:p-5">
                    <span className="flex items-center overflow-hidden">
                        {true && <button
                            className="md:hidden text-gray-400 hover:text-gray-500 mr-4"
                            onClick={handleCloseMessage}
                        >
                            <span className="sr-only">Close</span>
                            <svg
                                className="w-6 h-6 fill-current"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z"
                                />
                            </svg>
                        </button>}
                        <div className="w-full overflow-hidden">
                            <div className="flex items-center">
                                <span className="block ml-2 font-bold text-base text-gray-600 dark:text-white">
                                    {messageTitle}
                                </span>
                            </div>
                            <span className="block ml-2 text-sm text-gray-600 dark:text-slate-400 truncate overflow-hidden">
                                {messageSubTitle}
                            </span>
                        </div>
                        <ReplyMessage message={message} />
                    </span>
                </div>
                <div className="h-full">
                    {message && <iframe title="iframe" width="100%" height="100%" ref={iframeRef} />}
                </div>
            </div>}

        </div >
    )
}

export default EmailBody
