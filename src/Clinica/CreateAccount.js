import React, {useEffect, useState} from "react";
import {Dialog} from "@headlessui/react";
import {createWorkMail} from "./api/api";

function CreateAccount({createAccount, setCreateAccount}) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userCreated, setUserCreated] = useState(false);

    useEffect(() => {
        console.log(createAccount);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createAccount]);

    const handleCreateAccount = async (event) => {
        event.preventDefault();

        if (loading || error) return;

        console.log('handleCreateAccount', userName);

        if (!(userName && userPassword)) {
            setError("Please enter your username and password");
            return;
        }

        setLoading(true);
        createWorkMail(userName, userPassword, (result) => {
            console.log('userCreated', result);
            if (result) {
                setUserCreated(true);
            } else {
                setError("Failed to sign up. Please check your credentials and try again.");
            }
            setLoading(false);
        });


    }

    return (
        <><Dialog
            open={createAccount}
            onClose={() => {
                setCreateAccount(false);
            }}
            className="fixed z-30 inset-0 overflow-y-auto"
        >
            <div className="flex items-center justify-center min-h-screen">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl m-5">
                    <Dialog.Title
                        as="h3"
                        className="mb-3 text-lg font-medium leading-6 text-gray-600"
                    >Create an Account
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
                    {userCreated && <div className="flex flex-col justify-center">
                        <div className="p-5 text-center">
                            You have successfully created your account
                        </div>
                        <div className="flex self-end">
                            <button type="button"
                                className="bg-primary hover:bg-secondary text-white font-base w-30 px-4 py-2 rounded"
                                onClick={() => {
                                    setUserName("");
                                    setUserPassword("");
                                    setCreateAccount(false);
                                    setUserCreated(false);
                                }}>
                                Ok
                            </button>

                        </div>
                    </div>}
                    {!userCreated && <form
                        onSubmit={(e) => {
                            handleCreateAccount(e);
                        }}
                    >
                        {<div className="relative text-gray-600">
                            <div className="justify-center items-center grid grid-cols-1 xs:grid-cols-2 gap-2">
                                <input
                                    aria-placeholder="Username"
                                    placeholder="Username"
                                    type="text"
                                    className="my-3 p-2 block w-full rounded bg-gray-100 border-none focus:text-gray-700 ring-0 outline-none"
                                    onChange={(e) => {
                                        setError("");
                                        setUserName(e.target.value);
                                    }}
                                    value={userName}
                                />
                                <div>@clinica-technologies.com</div>
                            </div>

                            <input
                                aria-placeholder="Password"
                                placeholder="Password"
                                type="password"
                                className="my-3 p-2 block w-full rounded bg-gray-100 border-none focus:text-gray-700 ring-0 outline-none"
                                onChange={(e) => {
                                    setError("");
                                    setUserPassword(e.target.value);
                                }}
                                value={userPassword}
                            />

                        </div>
                        }

                        {<div className="mt-4 flex flex-col">
                            <div className="flex self-end">
                                <button type="button" className="hover:text-gray-600 text-gray-500 font-base py-2 px-4"
                                    onClick={() => {
                                        setCreateAccount(false);
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
                                    {!loading && <span className="py-2">Sign Up</span>}
                                </button>

                            </div>
                        </div>}
                    </form>}
                </div>
            </div>
        </Dialog >

        </>
    )
}

export default CreateAccount