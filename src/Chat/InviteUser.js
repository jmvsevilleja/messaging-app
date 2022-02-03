import React, {useEffect, useState} from "react";
import {Dialog} from "@headlessui/react";
import {getUserById, getChatRooms, getAccountById, getAccountByEmail} from "../api/queries";
import {addUser, addChatRoom, addChatRoomUser} from "../api/mutations";
import QrReader from 'react-qr-reader'

function InviteUser({user, handleChatRoomID}) {

    const [isOpen, setIsOpen] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [readQR, setreadQR] = useState(false);

    const handleScan = data => {
        if (data) {
            handleQRSubmit(data);
        }
    }

    const handleError = err => {
        setError("QR Reader is not working on your device!");
        console.log(err);
    }

    const handleReset = () => {
        setLoading(false);
        setIsOpen(false);
        setUserEmail("");
        setreadQR(false);
    }

    const handleCreateChat = async (selected_user) => {
        console.log("handleCreateChat", user.id, selected_user.id);
        // check if user logged and selected_user is already in chat room
        getChatRooms(user.id).then((chatroom_list) => {
            const found_user = chatroom_list.find((room) => {
                if (!Boolean(room.chatroom.group)) { // not a group chat
                    let needle = [user.id, selected_user.id];
                    var haystack = room.chatroom.chatRoomUsers.items.map(item => item.user.id);
                    return needle.every(item => haystack.includes(item));
                }
                return false;
            });

            console.log('handleCreateChat Found', found_user);
            if (!Boolean(found_user)) {
                // Creating Chat Room
                const chatroom_name = user.name + " - " + selected_user.name;
                addChatRoom(user.id, chatroom_name).then((chatroom) => {
                    addChatRoomUser(selected_user.id, chatroom.id).then(() => {
                        addChatRoomUser(user.id, chatroom.id).then(() => {
                            handleChatRoomID(chatroom.id).then(() => {
                                handleReset();
                            });
                        });
                    });
                });

            } else {
                // open chatroom from users list
                handleChatRoomID(found_user.chatroom.id).then(() => {
                    handleReset();
                });
            }
        });
    };

    const handleInviteUserSubmit = async (event) => {
        event.preventDefault();
        console.log('handleInviteUserSubmit', userEmail);
        // prevent double submit
        if (loading || error) return;
        setLoading(true);

        getAccountByEmail(userEmail).then((account_found) => {
            if (account_found) {
                if (account_found.id !== user.id) {
                    getUserById(account_found.id).then((user_found) => {
                        if (user_found) {
                            handleCreateChat(user_found);
                        }
                        if (!user_found) {
                            const name = account_found.first_name + " " + account_found.last_name;
                            console.log("user not found create to users table", account_found.id, name);
                            addUser(account_found.id, name).then((user_created) => {
                                handleCreateChat(user_created);
                            });
                        }
                    });
                    return;
                }
            }
            setError("Contact not found!");
            setLoading(false);
        });
    };

    const handleQRSubmit = async (qr_code) => {
        console.log('handleQRSubmit', qr_code);
        // prevent double submit
        if (loading) return;
        setLoading(true);

        getAccountById(qr_code).then((account_found) => {
            if (account_found) {
                if (account_found.id !== user.id) {
                    getUserById(account_found.id).then((user_found) => {
                        if (user_found) {
                            handleCreateChat(user_found);
                        }
                        if (!user_found) {
                            const name = account_found.first_name + " " + account_found.last_name;
                            console.log("user not found create to users table", account_found.id, name);
                            addUser(account_found.id, name).then((user_created) => {
                                handleCreateChat(user_created);
                            });
                        }
                    });
                    return;
                }
            }
            setError("Contact not found!");
            setLoading(false);
        });
    };
    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="outline-none focus:outline-none"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5 text-gray-400 hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
            </button>
            <Dialog
                open={isOpen}
                onClose={() => {
                    setreadQR(false);
                    setIsOpen(false);
                }}
                className="fixed z-30 inset-0 overflow-y-auto"
            >
                <div className="flex items-center justify-center min-h-screen">
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                    <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl m-5">
                        <Dialog.Title
                            as="h3"
                            className="mb-3 text-lg font-medium leading-6 text-gray-600"
                        >
                            Add Contact
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

                        {readQR && <div className="py-2">
                            {!loading &&
                                <QrReader
                                    facingMode={"environment"}
                                    delay={300}
                                    onError={handleError}
                                    onScan={handleScan}
                                    style={{width: '100%'}}
                                />}
                            {loading && <svg fill='none' className="animate-spin m-auto opacity-20" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                                <path clipRule='evenodd'
                                    d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                                    fill='currentColor' fillRule='evenodd' />
                            </svg>}
                        </div>}

                        <form
                            onSubmit={(e) => {
                                handleInviteUserSubmit(e);
                            }}
                        >
                            {!readQR && <><div className="relative text-gray-600 focus-within:text-gray-400">
                                <input
                                    aria-placeholder="Email"
                                    placeholder="Email"
                                    type="text"
                                    className="my-3 p-2 block w-full rounded bg-gray-100 border-none focus:text-gray-700 ring-0 outline-none"
                                    onChange={(e) => {
                                        setError("");
                                        setUserEmail(e.target.value);
                                    }}
                                    required
                                    value={userEmail}
                                />
                            </div>
                                {/* <div className="flex justify-center -my-2"><span className="text-sm text-primary">or</span></div> */}
                                {/* <div className="relative text-gray-600 focus-within:text-gray-400">
                                <input
                                    aria-placeholder="Phone"
                                    placeholder="Phone"
                                    type="text"
                                    className="my-3 p-2 block w-full rounded bg-gray-100 border-none focus:text-gray-700 ring-0 outline-none"
                                    onChange={(e) => {
                                        setUserPhone(e.target.value);
                                    }}
                                    value={userPhone}
                                />
                            </div> */}
                                <div className="flex justify-center -mt-2 mb-1"><span className="text-sm text-primary">or</span></div>
                                <div className="flex justify-center">
                                    <button
                                        type="button"
                                        className="bg-primary hover:bg-secondary text-white font-base w-24 px-4 rounded"
                                        onClick={() => {
                                            setError("");
                                            setreadQR(true);
                                        }}>
                                        <span className="py-2">Scan QR</span>
                                    </button>
                                </div>
                            </>
                            }
                            {readQR &&
                                <div className="flex justify-center mt-2">
                                    <button
                                        type="button"
                                        className="bg-primary hover:bg-secondary text-white font-base w-24 px-4 rounded"
                                        onClick={() => {
                                            setError("");
                                            setreadQR(false);
                                        }}>
                                        <span className="py-2">Cancel</span>
                                    </button>
                                </div>}
                            {!readQR && <div className="mt-4 flex flex-col">
                                <div className="flex self-end">
                                    <button className="hover:text-gray-600 text-gray-500 font-base py-2 px-4"
                                        onClick={() => {
                                            setIsOpen(false);
                                        }}>
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-primary hover:bg-secondary text-white font-base w-24 px-4 rounded">

                                        {loading && <svg fill='none' className="w-10 animate-spin m-auto" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                                            <path clipRule='evenodd'
                                                d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                                                fill='currentColor' fillRule='evenodd' />
                                        </svg>}
                                        {!loading && <span className="py-2">Add</span>}
                                    </button>

                                </div>
                            </div>}
                        </form>
                    </div>
                </div>
            </Dialog >
        </>
    )
}

export default InviteUser