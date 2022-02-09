import React, {useState} from "react";
import {editChatRoom, editChatRoomUser} from "../api/mutations";
import {Dialog} from "@headlessui/react";

function DeleteChatRoom({user, chatRoom}) {

    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDeleteChatRoom = async (event) => {
        event.preventDefault();
        console.log('Handle Delete Chatroom', chatRoom);
        if (loading) return;
        setLoading(true);
        if (user.id !== chatRoom.chatRoomAdminId) return;
        await Promise.all(chatRoom.users
            .map(async (item) => {
                console.log('Delete chatroomuser', item.id);
                await editChatRoomUser({
                    id: item.id,
                    deleted: true
                })
            })).then(() => {
                console.log('Delete chatroom', chatRoom.id);
                editChatRoom({
                    id: chatRoom.id,
                    deleted: true,
                });

                setIsOpen(false);
                setLoading(false);

            });
    }

    return <div className="p-2">
        <button
            type="button"
            onClick={() => setIsOpen(true)}
            title="Delete Chat"
            className="outline-none focus:outline-none flex items-center text-gray-400 hover:text-gray-500"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>

            <div className="ml-4 text-md font-medium text-base text-red-600">Delete group chat</div>
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
                        Delete this chat?
                    </Dialog.Title>
                    <form
                        onSubmit={(e) => {
                            handleDeleteChatRoom(e);
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
                                    {!loading && <span className="py-2">Delete Chat</span>}
                                </button>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Dialog >
    </div>

}

export default DeleteChatRoom;
