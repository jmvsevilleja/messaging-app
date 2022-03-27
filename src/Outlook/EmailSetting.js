import React, {useEffect, useState} from "react";
import {Dialog} from "@headlessui/react";
import Editor from "../components/Editor"
import {getEmailSignatureById} from "../api/queries";
import {addSignature, editSignature} from "../api/mutations";
import {
    useIsAuthenticated,
    useMsal,
} from "@azure/msal-react";

function MessageCreate({user}) {
    const [isOpen, setIsOpen] = useState(false);
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [userSignature, setUserSignature] = useState("");
    const {instance, accounts} = useMsal();

    useEffect(() => {

        if (accounts) {
            getEmailSignatureById(accounts[0].username).then((result) => {
                if (result) {
                    setUserSignature(result.signature);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);


    const handleMessageCreate = async (event) => {
        event.preventDefault();
        console.log('handleMessageCreate');
        // prevent double submit
        if (loading || error) return;

        if (userSignature === "") {
            setError("Enter a signature");
            return;
        }

        if (accounts) {
            setLoading(true);
            getEmailSignatureById(accounts[0].username).then((result) => {
                if (result) {
                    editSignature(accounts[0].username, userSignature).then(() => {
                        setLoading(false);
                        setIsOpen(false);
                    })
                } else {
                    addSignature(accounts[0].username, userSignature).then(() => {
                        setLoading(false);
                        setIsOpen(false);
                    });
                };
            });
        }
    }


    return (
        <>
            <button type="button"
                onClick={() => {
                    setIsOpen(true);
                }}
                className="text-gray-400 hover:text-gray-500 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </button>
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
                            >Settings
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
                                            setUserSignature("");
                                            setSent(false);
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
                                    <div className="">Signature</div>

                                    <Editor
                                        userMessage={userSignature}
                                        onChange={(html) => {
                                            setError("");
                                            setUserSignature(html);
                                        }} />
                                </div>
                                }

                                {<div className="mt-4 flex flex-col">
                                    <div className="flex self-end">
                                        <button type="button" className="hover:text-gray-600 text-gray-500 font-base py-2 px-4"
                                            onClick={() => {
                                                setUserSignature("");
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
                                            {!loading && <span className="py-2">Save</span>}
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