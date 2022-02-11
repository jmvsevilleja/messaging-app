import React, {useEffect, useState} from "react";
import {addChatRoomUser, editChatRoomUser} from "../api/mutations";
import {Dialog} from "@headlessui/react";
import UserSelect from "./userselect";

function EditChatRoomUser({user, chatRoomList, chatRoom}) {

    const [isOpen, setIsOpen] = useState(false);
    const [userList, setUserList] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchUserList, setSearchUserList] = useState([]);

    useEffect(() => {
        //console.log('chatRoom', chatRoom.users);
        const chatroom_users = chatRoom.users.filter((item) => !item.deleted).map((item) => ({id: item.user.id}));
        setSelectedUsers(chatroom_users);
    }, [chatRoom]);

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
            item.name.toLowerCase().includes(searchText.toLowerCase())
        ));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchText, userList]);

    const handleSelectedUsers = async (e, user) => {
        //console.log('handleSelectedUsers', e.target.checked, selectedUsers);
        if (e.target.checked) {
            setSelectedUsers([
                ...selectedUsers,
                {id: user.id}
            ]);

        } else {
            setSelectedUsers(selectedUsers.filter((item) => item.id !== user.id));
        }
    }

    const handleEditRoomSubmit = async (event) => {
        event.preventDefault();
        // console.log('chatRoom.users', chatRoom.users);
        // console.log('handleEditRoomSubmit', selectedUsers);
        // prevent double submit
        if (loading) return;
        setLoading(true);

        // Remove Users
        await Promise.all(chatRoom.users.filter((item) => !item.deleted)
            .map(async (item) => {
                const delete_user = selectedUsers.find((selected) => selected.id === item.user.id);
                if (!delete_user) { // delete when unchecked
                    //console.log('delete_user', item.user.id);
                    await editChatRoomUser({
                        id: item.id,
                        deleted: true
                    });
                }
            }));
        // Add Users
        await Promise.all(
            selectedUsers.map(async (item) => {
                const edit_user = chatRoom.users.find((selected) => (selected.user.id === item.id && selected.deleted));
                if (edit_user) { // edit only deleted users
                    console.log('edit_user', edit_user);
                    await editChatRoomUser({
                        id: edit_user.id,
                        deleted: false,
                    });
                } else {
                    const add_user = chatRoom.users.find((selected) => selected.user.id === item.id);
                    if (!add_user) {  // then add user
                        console.log('add_user', item.id);
                        await addChatRoomUser(item.id, chatRoom.id);
                    }
                }

            })
        );

        setLoading(false);
        setIsOpen(false);
    };

    return <>

        <button
            type="button"
            onClick={() => setIsOpen(true)}
            title="Update Group Participants"
            className="outline-none focus:outline-none text-gray-400 hover:text-gray-500"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="18"
                fill="none"
                viewBox="0 0 22 18"
                className="fill-current mr-1"
            >
                <path
                    d="M7 0a5 5 0 100 10A5 5 0 007 0zM4 5a3 3 0 116 0 3 3 0 01-6 0zM14 18h-2a5 5 0 00-10 0H0a7 7 0 1114 0zM19 14h-2v-3h-3V9h3V6h2v3h3v2h-3v3z"
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
                        Update Group Participants
                    </Dialog.Title>
                    <form
                        onSubmit={(e) => {
                            handleEditRoomSubmit(e);
                        }}
                    >
                        <label>
                            <span className="text-base text-gray-500">Group participants</span>

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
                            {searchUserList.length !== 0 &&
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
                                    {!loading && <span className="py-2">Save</span>}
                                </button>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Dialog >
    </>

}

export default EditChatRoomUser;
