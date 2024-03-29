import React, {useEffect, useState} from "react";
import {Dialog} from "@headlessui/react";
import {sendMessage} from "./api/api";
import Editor from "../components/Editor"
import {getProfile} from "./api/api";
import {getEmailSignatureById} from "../api/queries";

function MessageReply({message, messageReply, closeMessageReply}) {

    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userSubject, setUserSubject] = useState("");
    const [userMessage, setUserMessage] = useState("");
    const [replyMsgId, setReplyMsgId] = useState(null);

    useEffect(() => {
        getProfile().then((user) => {
            const user_email = user.result.emailAddress;
            getEmailSignatureById(user_email).then((result) => {
                if (result) {
                    setUserMessage(result.signature);
                }
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messageReply]);

    useEffect(() => {
        const from = message.result.messageHeaders.find((item) => item.name === 'From').value;
        const subject = "Re: " + message.result.messageHeaders.find((item) => item.name === 'Subject').value;
        const replayMsgId = message.result.messageHeaders.find((item) => item.name === 'Message-ID');
        setUserEmail(from);
        setUserSubject(subject);
        setReplyMsgId(replayMsgId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message]);

    const handleMessageReply = async (event) => {
        event.preventDefault();
        console.log('handleMessageReply', message);
        // prevent double submit
        if (loading || error) return;

        if (userMessage === "") {
            setError("Enter a message");
            return;
        }
        const from = message.result.messageHeaders.find((item) => item.name === 'From').value;
        const date = new Date(message.result.messageHeaders.find((item) => item.name === 'Date').value);
        const date_value = date.toLocaleString("en-US", {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'});
        let email = `${userMessage}`;
        email += `<br />---------- Original message ---------<br />`;
        email += `From: ${from} <br />`;
        email += `Date: ${date_value} <br />`;
        email += `Subject: ${userSubject} <br />`;
        email += `${message.body}`;
        const filteredSubject = userSubject.replace(/[\u1000-\uFFFF]/gm, "");

        setLoading(true);
        sendMessage({
            To: userEmail,
            Subject: filteredSubject,
            "In-Reply-To": replyMsgId ? replyMsgId.value : '',
        }, email, () => {
            setSent(true);
            setLoading(false);
        });

    }

    return (
        <>
            {
                messageReply && <Dialog
                    open={messageReply}
                    onClose={closeMessageReply}
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
                                        onClick={closeMessageReply}>
                                        Ok
                                    </button>

                                </div>
                            </div>}
                            {!sent && <form
                                onSubmit={(e) => {
                                    handleMessageReply(e);
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
                                        readOnly
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
                                        readOnly
                                        disabled
                                        value={userSubject}
                                    />
                                    <Editor
                                        userMessage={userMessage}
                                        onChange={(html) => {
                                            setError("");
                                            setUserMessage(html);
                                        }} />

                                </div>
                                }

                                {<div className="mt-4 flex flex-col">
                                    <div className="flex self-end">
                                        <button type="button" className="hover:text-gray-600 text-gray-500 font-base py-2 px-4"
                                            onClick={closeMessageReply}>
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

export default MessageReply