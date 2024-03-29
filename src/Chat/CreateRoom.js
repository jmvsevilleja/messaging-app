import React, {useEffect, useState} from "react";
import {addChatRoom, addChatRoomUser} from "../api/mutations";

import {Dialog} from "@headlessui/react";
import UserSelect from "./userselect";

function CreateRoom({user, chatRoomList, handleChatRoomID}) {

    const [isOpen, setIsOpen] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [userList, setUserList] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchUserList, setSearchUserList] = useState([]);

    useEffect(() => {
        // get non group users from the chatroom list
        if (chatRoomList.length !== 0) {
            const user_list = chatRoomList.filter((item) => (!item.chatroom.group)).map((item) => {
                return item.chatroom.chatRoomUsers.items.filter((item) => (user.id !== item.user.id))[0].user;
            });
            setUserList(user_list);
            setSearchUserList(user_list);
        }
    }, [chatRoomList, user]);

    useEffect(() => {
        setSearchUserList(userList.filter(item =>
            item.name ? item.name.toLowerCase().includes(searchText.toLowerCase()) : ""
        ));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchText, userList]);

    const handleSelectedUsers = async (e, user) => {
        //console.log('handleSelectedUsers', e.target.checked, item);
        if (e.target.checked) {
            setSelectedUsers([
                ...selectedUsers,
                {id: user.id}
            ]);

        } else {
            setSelectedUsers(selectedUsers.filter((item) => item.id !== user.id));
        }
    }
    const handleCreateRoomSubmit = async (event) => {
        event.preventDefault();
        console.log('handleCreateRoomSubmit', groupName, selectedUsers);
        // prevent double submit
        if (loading) return;
        setLoading(true);

        addChatRoom(user.id, groupName, true).then(async (chatroom) => {
            await Promise.all(
                selectedUsers.map(async (item) => {
                    await addChatRoomUser(item.id, chatroom.id);
                })
            );

            addChatRoomUser(user.id, chatroom.id).then(() => {
                handleChatRoomID(chatroom.id).then(() => {
                    setGroupName("");
                    setSearchText("");
                    setSelectedUsers([]);
                    setIsOpen(false);
                    setLoading(false);
                });
            });
        });
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                title="Create Group Chat"
                className="outline-none focus:outline-none text-gray-400 hover:text-gray-500"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="18"
                    fill="none"
                    viewBox="0 0 28 18"
                    className="fill-current"
                >
                    <path
                        d="M7 0a5 5 0 100 10A5 5 0 007 0zM4 5a3 3 0 116 0 3 3 0 01-6 0zM14.908 5.218A2 2 0 0014 5V3a4 4 0 11-2.357 7.232l1.178-1.616a2 2 0 102.087-3.398zM17.998 18A3.999 3.999 0 0014 14.002V12a6.001 6.001 0 016 6h-2.002zM14 18h-2a5 5 0 00-10 0H0a7 7 0 1114 0z"
                    ></path>
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
                            <label>
                                <span className="text-base text-gray-500">Add group participants</span>

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
                                        value={searchText}
                                    />
                                </div>
                            </label>

                            <ul className="pt-2 mt-2 scrollable overflow-x-hidden overflow-y-auto h-80">

                                {user && searchUserList.length !== 0 &&
                                    searchUserList
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
                                                selectedUsers={selectedUsers}
                                                handleSelectedUsers={handleSelectedUsers}
                                                key={item.id}
                                            />
                                        ))}
                            </ul>

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
    )
}

export default CreateRoom