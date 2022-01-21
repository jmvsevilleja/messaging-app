import React, {useState} from "react";

import {API, graphqlOperation} from "aws-amplify";
import {
    createChatRoom,
    createChatRoomUser
} from "../graphql/mutations";

import {Dialog} from "@headlessui/react";
import UserSelect from "./userselect";

function CreateRoom({user, userList, handleChatRoomID}) {

    const [isOpen, setIsOpen] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);

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
        // Creating Chat Room
        const room = await API.graphql(
            graphqlOperation(createChatRoom, {
                input: {
                    name: groupName,
                    chatRoomAdminId: user.id,
                    group: true,
                },
            })
        );
        console.log("createChatRoom", room, room.data.createChatRoom.id);
        //Creating Chat Room User
        selectedUsers.map(async (item) => {
            await API.graphql(
                graphqlOperation(createChatRoomUser, {
                    input: {
                        chatRoomUserUserId: item.id,
                        chatRoomChatRoomUsersId:
                            room.data.createChatRoom.id,
                    },
                })
            );
        });
        //Creating Chat Room Admin
        await API.graphql(
            graphqlOperation(createChatRoomUser, {
                input: {
                    chatRoomUserUserId: user.id,
                    chatRoomChatRoomUsersId: room.data.createChatRoom.id,
                },
            })
        );
        console.log('createChatRoomUser', room.data.createChatRoom.id);
        // Open ChatRoom with this Id
        handleChatRoomID(room.data.createChatRoom.id).then(() => {
            setGroupName("");
            setSearchText("");
            setSelectedUsers([]);
            setIsOpen(false);
            setLoading(false);
        });

    };

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
                                                selectedUsers={selectedUsers}
                                                handleSelectedUsers={handleSelectedUsers}
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
                                        className="bg-primary hover:bg-secondary text-white font-base w-24 px-4 rounded">



                                        {loading && <svg fill='none' className="w-10 animate-spin m-auto" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                                            <path clip-rule='evenodd'
                                                d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                                                fill='currentColor' fill-rule='evenodd' />
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