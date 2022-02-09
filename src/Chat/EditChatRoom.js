import React, {useState} from "react";
import {editChatRoom} from "../api/mutations";
import Avatar from "react-avatar";
import {Dialog} from "@headlessui/react";

function EditChatRoom({avatar, user, chatRoom}) {

    const [isOpen, setIsOpen] = useState(false);
    const [groupName, setGroupName] = useState(chatRoom.name);
    const [loading, setLoading] = useState(false);

    const handleEditChatRoom = async (event) => {
        event.preventDefault();
        console.log('Handle Delete Chatroom', chatRoom);
        if (loading) return;
        setLoading(true);
        editChatRoom({
            id: chatRoom.id,
            name: groupName,
        }).then(() => {

            setIsOpen(false);
            setLoading(false);
        });
    }

    return <>
        {avatar && <button
            type="button"
            onClick={() => setIsOpen(true)}
            title="Edit Group Picture"
            className="outline-none focus:outline-none"
        ><Avatar
                size="100"
                round={true}
                name={chatRoom.name}
            /></button>}

        {!avatar && <button
            type="button"
            onClick={() => setIsOpen(true)}
            title="Edit Group Info"
            className="absolute bottom-1 -right-8 text-gray-400 hover:text-gray-500 outline-none focus:outline-none"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
        </button>}
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
                        Update Group Info
                    </Dialog.Title>
                    <form
                        onSubmit={(e) => {
                            handleEditChatRoom(e);
                        }}
                    >
                        <div className="relative text-gray-600 focus-within:text-gray-400">
                            <input
                                aria-placeholder="Group Name"
                                placeholder="Group Name"
                                type="text"
                                className="my-3 p-2 block w-full rounded bg-gray-100 border-none focus:text-gray-700 ring-0 outline-none"
                                required
                                onChange={(e) => {
                                    setGroupName(e.target.value);
                                }}
                                value={groupName}
                            />
                        </div>


                        <div className="mt-4 flex flex-col">
                            <div className="flex self-end">
                                <button type="button" className="hover:text-gray-600 text-gray-500 font-base py-2 px-4" onClick={() => {
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
                                    {!loading && <span className="py-2">Submit</span>}
                                </button>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Dialog >
    </>

}

export default EditChatRoom;
