import React, {useEffect, useState} from "react";

import ConvoLogo from '../logo.svg';

import MessageReply from './MessageReply';
import MessageForward from './MessageForward';
import {Menu} from '@headlessui/react'

function EmailBody({
    message,
    handleCloseMessage,
    handleEmailReply,
    isLoadingBody,
    onDeleteSuccess,
    handleMessageDelete
}) {

    const iframeRef = React.useRef(null);
    const [messageTitle, setMessageTitle] = useState("");
    const [messageSubTitle, setMessageSubTitle] = useState("");
    const [messageDate, setMessageDate] = useState("");

    const [messageReply, setMessageReply] = useState(false);
    const [messageForward, setMessageForward] = useState(false);

    const closeMessageReply = () => {
        setMessageReply(false)
    }
    const closeMessageForward = () => {
        setMessageForward(false)
    }

    const handleMessagePrint = (id) => {
        const iframe = document.frames
            ? document.frames[id]
            : document.getElementById(id);
        const iframeWindow = iframe.contentWindow || iframe;
        iframe.focus();
        iframeWindow.print();
        return false;
    }

    useEffect(() => {
        if (message) {
            console.log(message);
            const {body} = iframeRef.current.contentWindow.document;
            body.style.margin = "20px";
            body.style.fontFamily = "Arial, Helvetica, sans-serif";
            body.style.fontSize = "13px";
            body.innerHTML = message.body.content + '<base target="_blank">';;
            const subject = message.subject;
            const from = message.from ? message.from.emailAddress.name + ' <' + message.from.emailAddress.address + '>' : '';
            const date = new Date(message.sentDateTime);
            const date_value = date.toLocaleString("en-US", {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'});
            //console.log(message);
            setMessageTitle(subject);
            setMessageSubTitle(from);
            setMessageDate(date_value);
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
                                {messageSubTitle}  {messageDate}
                            </span>
                        </div>
                        <MessageReply
                            message={message}
                            messageReply={messageReply}
                            closeMessageReply={closeMessageReply} />
                        <MessageForward
                            message={message}
                            messageForward={messageForward}
                            closeMessageForward={closeMessageForward} />
                        <div className="flex">
                            <Menu>
                                <Menu.Button>
                                    <div className="text-gray-400 hover:text-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                        </svg>
                                    </div>
                                </Menu.Button>
                                <Menu.Items className="absolute right-10 top-10 bg-white text-gray-500 drop-shadow p-1 rounded" >
                                    <div className="text-base hover:bg-gray-100">
                                        <Menu.Item>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setMessageReply(true);
                                                }}
                                                className="w-full font-medium text-gray-600 text-left px-2 py-1 flex justify-left"
                                                title="Reply Message"
                                            ><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor" >
                                                    <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>Reply</button>
                                        </Menu.Item>
                                    </div>
                                    <div className="text-base hover:bg-gray-100">
                                        <Menu.Item>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setMessageForward(true);
                                                }}
                                                className="w-full font-medium text-gray-600 text-left px-2 py-1 flex justify-left"
                                                title="Forward Message"
                                            ><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor" transform="scale(-1, 1)" >
                                                    <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>Forward</button>
                                        </Menu.Item>
                                    </div>
                                    <div className="text-base hover:bg-gray-100">
                                        <Menu.Item>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    handleMessagePrint('iframe');
                                                }}
                                                className="w-full font-medium text-gray-600 text-left px-2 py-1 flex justify-left"
                                                title="Print Message"
                                            ><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                                </svg>Print</button>
                                        </Menu.Item>
                                    </div>
                                    <div className="text-base hover:bg-gray-100">
                                        <Menu.Item>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    handleMessageDelete(message.id);
                                                }}
                                                className="w-full font-medium text-gray-600 text-left px-2 py-1 flex justify-left"
                                                title="Delete Message"
                                            ><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>Delete</button>
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Menu>
                        </div>
                    </span>
                </div>
                <div className="h-full">
                    {message && <iframe id="iframe" title="iframe" width="100%" height="100%" ref={iframeRef} />}
                </div>
            </div>}

        </div >
    )
}

export default EmailBody
