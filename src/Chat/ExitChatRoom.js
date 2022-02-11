import React, {useState} from "react";
import {Dialog} from "@headlessui/react";
import {editChatRoomUser} from "../api/mutations";

function ExitChatRoom({user, chatRoom}) {

    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleExitChatRoom = async (event) => {
        event.preventDefault();
        console.log('Handle Exit Chatroom', chatRoom, user.id);
        if (loading) return;
        setLoading(true);
        const current_user = chatRoom.users.find((selected) => selected.user.id === user.id);
        console.log(current_user);
        await editChatRoomUser({
            id: current_user.id,
            deleted: true
        });
        setIsOpen(false);
        setLoading(false);
    }

    return <div className="px-2">
        <button
            type="button"
            onClick={() => setIsOpen(true)}
            title="Exit Chat"
            className="py-2 outline-none focus:outline-none flex items-center text-gray-400 hover:text-gray-500"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>

            <div className="ml-4 text-md font-medium text-base text-red-600">Exit chat</div>
        </button>
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="fixed z-30 inset-0 overflow-y-auto"
        >
            <div className="flex items-center justify-center min-h-screen">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl m-5">
                    <Dialog.Title
                        as="h3"
                        className="mb-3 text-lg font-medium leading-6 text-gray-600"
                    >
                        Exit this chat?
                    </Dialog.Title>
                    <form
                        onSubmit={(e) => {
                            handleExitChatRoom(e);
                        }}
                    >
                        <div className="mt-4 flex flex-col">
                            <div className="flex self-end">
                                <button type="button" className="hover:text-gray-600 text-gray-500 font-base py-2 px-4" onClick={() => {
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
                                    {!loading && <span className="py-2">Exit Chat</span>}
                                </button>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Dialog >
    </div>

}

export default ExitChatRoom;
