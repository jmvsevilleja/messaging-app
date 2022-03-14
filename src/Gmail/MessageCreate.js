import React, {useEffect, useState} from "react";
import {Dialog} from "@headlessui/react";
import {replyMessage} from "./api/api";

function MessageCreate({message}) {
    //console.log(message.result.messageHeaders);

    const [isOpen, setIsOpen] = useState(false);
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userSubject, setUserSubject] = useState("");
    const [userMessage, setUserMessage] = useState("");
    const [replyMsgId, setReplyMsgId] = useState(null);

    useEffect(() => {
        const from = message.result.messageHeaders.find((item) => item.name === 'From').value;
        const subject = "RE: " + message.result.messageHeaders.find((item) => item.name === 'Subject').value;
        const replayMsgId = message.result.messageHeaders.find((item) => item.name === 'Message-ID');
        setUserEmail(from);
        setUserSubject(subject);
        setReplyMsgId(replayMsgId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message]);

    const handleMessageCreate = async (event) => {
        event.preventDefault();
        console.log('handleMessageCreate', userEmail);
        // prevent double submit
        if (loading || error) return;

        if (userMessage === "") {
            setError("Enter a message");
            return;
        }

        replyMessage({
            To: userEmail,
            Subject: userSubject,
            "In-Reply-To": replyMsgId ? replyMsgId.value : '',
        }, userMessage, () => {
            console.log('replyMessage done');
            setSent(true);
        });

    }

    return (
        <>
            {replyMsgId && <button
                type="button"
                onClick={() => {
                    setIsOpen(true);
                }}
                className="outline-none bg-white text-gray-600 font-base rounded font-base py-1 px-2 border shadow-md text-sm"
                title="Reply Message"
            ><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg></button>}
            {
                isOpen && <Dialog
                    open={isOpen}
                    onClose={() => {
                        setIsOpen(false);
                    }}
                    className="fixed z-30 inset-0 overflow-y-auto"
                >
                    <div className="flex items-center justify-center min-h-screen">
                        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                        <div className="inline-block w-full max-w-3xl max-h-3xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl m-5">
                            <Dialog.Title
                                as="h3"
                                className="mb-3 text-lg font-medium leading-6 text-gray-600"
                            >Reply
                            </Dialog.Title>
                            {error &&
                                <div className="px-4 py-2 rounded-sm text-sm bg-red-100 border border-red-200 text-red-600">
                                    <div className="flex w-full justify-between items-start">
                                        <div className="flex">
                                            <svg className="w-4 h-4 shrink-0 fill-current opacity-80 mt-[3px] mr-3" viewBox="0 0 16 16">
                                                <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm3.5 10.1l-1.4 1.4L8 9.4l-2.1 2.1-1.4-1.4L6.6 8 4.5 5.9l1.4-1.4L8 6.6l2.1-2.1 1.4 1.4L9.4 8l2.1 2.1z" />
                                            </svg>
                                            <div>{error}</div>
                                        </div>
                                        <button className="opacity-70 hover:opacity-80 ml-3 mt-[3px]"
                                            onClick={() => {
                                                setError("");
                                            }}>
                                            <div className="sr-only">Close</div>
                                            <svg className="w-4 h-4 fill-current">
                                                <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>}
                            {sent && <div className="flex flex-col justify-center">
                                <div className="p-5 text-center">
                                    Message Sent
                                </div>
                                <div className="flex self-end">
                                    <button type="button"
                                        className="bg-primary hover:bg-secondary text-white font-base w-30 px-4 py-2 rounded"
                                        onClick={() => {
                                            setIsOpen(false)
                                        }}>
                                        Ok
                                    </button>

                                </div>
                            </div>}
                            {!sent && <form
                                onSubmit={(e) => {
                                    handleMessageCreate(e);
                                }}
                            >
                                {<div className="relative text-gray-600">
                                    <input
                                        aria-placeholder="Email"
                                        placeholder="Email"
                                        type="text"
                                        className="my-3 p-2 block w-full rounded bg-gray-200 border-none focus:text-gray-700 ring-0 outline-none"
                                        // onChange={(e) => {
                                        //     setError("");
                                        //     setUserEmail(e.target.value);
                                        // }}
                                        readonly
                                        disabled
                                        value={userEmail}
                                    />
                                    <input
                                        aria-placeholder="Subject"
                                        placeholder="Subject"
                                        type="text"
                                        className="my-3 p-2 block w-full rounded bg-gray-200 border-none focus:text-gray-700 ring-0 outline-none"
                                        // onChange={(e) => {
                                        //     setError("");
                                        //     setUserSubject(e.target.value);
                                        // }}
                                        readonly
                                        disabled
                                        value={userSubject}
                                    />
                                    <textarea
                                        autofocus
                                        aria-placeholder="Message"
                                        placeholder="Message"
                                        type="text"
                                        rows="5"
                                        className="my-3 p-2 block w-full rounded bg-gray-100 border-none focus:text-gray-700 ring-0 outline-none "
                                        onChange={(e) => {
                                            setError("");
                                            setUserMessage(e.target.value);
                                        }}
                                        value={userMessage}
                                    />

                                </div>
                                }

                                {<div className="mt-4 flex flex-col">
                                    <div className="flex self-end">
                                        <button type="button" className="hover:text-gray-600 text-gray-500 font-base py-2 px-4"
                                            onClick={() => {
                                                setIsOpen(false);
                                            }}>
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-primary hover:bg-secondary text-white font-base w-30 px-4 rounded">

                                            {loading && <svg fill='none' className="w-10 animate-spin m-auto" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                                                <path clipRule='evenodd'
                                                    d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                                                    fill='currentColor' fillRule='evenodd' />
                                            </svg>}
                                            {!loading && <span className="py-2">Send</span>}
                                        </button>

                                    </div>
                                </div>}
                            </form>}
                        </div>
                    </div>
                </Dialog >
            }
        </>
    )
}

export default MessageCreate