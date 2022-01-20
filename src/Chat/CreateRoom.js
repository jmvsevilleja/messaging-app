import React, {useEffect, useState} from "react";
import {Dialog} from "@headlessui/react";

import UserSelect from "./userselect";

function CreateRoom({user, userList}) {

    const [isOpen, setIsOpen] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [selected, setSelected] = useState([]);
    const [searchText, setSearchText] = useState("");

    const handleSelected = async (e, user) => {
        if (e.target.checked) {
            setSelected([
                ...selected,
                {id: user.id}
            ]);

        } else {
            setSelected(selected.filter((item) => item.id !== user.id));
        }
        //console.log('handleSelected', e.target.checked, item);
    }
    const handleCreateRoomSubmit = async (event) => {
        event.preventDefault();
        console.log('handleCreateRoomSubmit', groupName, selected);
        setGroupName("");
        setSearchText("");
        setSelected([]);
        setIsOpen(false);
    }
    // const handleCreateRoom = async (event) => {
    //     // Prevent the page from reloading
    //     event.preventDefault();
    //     // Try make the mutation to graphql API
    //     try {
    //         const created_message = await API.graphql({
    //             query: createMessage,
    //             variables: {
    //                 input: {
    //                     // id is auto populated by AWS Amplify
    //                     content: messageText, // the message content the user submitted (from state)
    //                     chatRoomMessagesId: chatRoom.id,
    //                     userMessageId: user.id, // this is the id of the current user
    //                     status: "SENT",
    //                 },
    //             },
    //         });
    //         console.log("Created Message", created_message);
    //         if (false) {
    //             await API.graphql({
    //                 query: updateChatRoom,
    //                 variables: {
    //                     input: {
    //                         // id: chatroom.id,
    //                         // newMessages: 10,
    //                         // _version: 1,
    //                     },
    //                 },
    //             });
    //         }
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    // useEffect(() => {
    //     console.log('useEffect Create Room');
    //     // if (userList) {
    //     //     console.log('Create Room User list', userList);
    //     // }
    // }, []);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
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
                            Create Group Chat
                        </Dialog.Title>
                        <form
                            onSubmit={(e) => {
                                handleCreateRoomSubmit(e);
                                //setIsOpen(false)
                            }}
                        >
                            <div className="relative text-gray-600 focus-within:text-gray-400">
                                <input
                                    aria-placeholder="Group Name"
                                    placeholder="Group Name"
                                    type="text"
                                    className="my-2 py-2 p-2 block w-full rounded bg-gray-100 border-none focus:text-gray-700 ring-0 outline-none"
                                    required
                                    onChange={(e) => {
                                        setGroupName(e.target.value);
                                    }}
                                    value={groupName}
                                />
                            </div>
                            <p className="mt-5 text-base text-gray-500">
                                Add group participants
                            </p>
                            <div className="relative text-gray-600 focus-within:text-gray-400">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        className="w-6 h-6 text-gray-500"
                                    >
                                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                    </svg>
                                </span>
                                <input
                                    aria-placeholder="Search Name"
                                    placeholder="Search Name"
                                    className="py-2 pl-10 pr-2 block w-full rounded bg-gray-100 border-none focus:text-gray-700 ring-0 outline-none"
                                    type="search"
                                    name="search"
                                    autoComplete="off"
                                    onChange={(e) => {
                                        setSearchText(e.target.value);
                                    }}
                                />
                            </div>

                            <ul className="pt-2 mt-2 scrollable pr-5 overflow-x-hidden overflow-y-auto h-80">

                                {user &&
                                    userList
                                        .filter((item) => {
                                            return item.id !== user.id;
                                        })
                                        // sort user by name
                                        .sort((a, b) =>
                                            a.name.localeCompare(b.name)
                                        )
                                        .map((item) => (
                                            <UserSelect
                                                user={item}
                                                selected={selected}
                                                handleSelected={handleSelected}
                                                key={item.id}
                                            />
                                        ))}
                            </ul>

                            <div className="mt-4 flex flex-col">
                                <div className="flex self-end">
                                    <button className="hover:text-gray-600 text-gray-500 font-base py-2 px-4" onClick={() => {
                                        setIsOpen(false);
                                    }}>
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-primary hover:bg-secondary text-white font-base py-2 px-4 rounded">
                                        Submit
                                    </button>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Dialog >
        </>
    )
}

export default CreateRoom