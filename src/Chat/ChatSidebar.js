import React, {useEffect, useState} from "react";
import Avatar from "react-avatar";

import User from "./user";
import ChatRoom from "./chatroom";
import CreateRoom from "./CreateRoom";

function ChatSidebar({
    user,
    chatRoomID,
    openChat,
    userList,
    chatRoomList,
    handleLogout,
    handleChatRoom,
    handleChatRoomID,
    handleCreateChat
}) {

    const [searchText, setSearchText] = useState("");
    const [searchUserList, setSearchUserList] = useState([]);
    const [searchChatRoomList, setSearchChatRoomList] = useState([]);

    useEffect(() => {
        setSearchUserList(userList);
        setSearchChatRoomList(chatRoomList);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userList, chatRoomList]);

    useEffect(() => {
        setSearchUserList(userList.filter(item =>
            item.name.toLowerCase().includes(searchText.toLowerCase())
        ));

        setSearchChatRoomList(chatRoomList.filter(item =>
            item.chatroom.name.toLowerCase().includes(searchText.toLowerCase())
        ));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchText]);

    return (
        <div
            id="messages-sidebar"
            className={" bg-white absolute z-20 pl-5 top-0 bottom-0 w-full md:w-auto md:static md:top-auto md:bottom-auto -mr-px md:translate-x-0 transform transition-transform duration-200 ease-in-out border-r border-gray-200"
                + (!openChat ? " translate-x-0" : " -translate-x-full")}

        >
            <div className="my-3 pr-5">
                <div className="flex justify-between item-center p-3 px-0 mb-3">
                    <span className="flex items-center">
                        {user && (
                            <div className="relative">
                                <Avatar
                                    size="40"
                                    round={true}
                                    name={user.name}
                                />
                                <div className={"absolute bottom-0 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"}></div>
                            </div>
                        )}

                        <span className="block ml-2 font-bold text-base text-gray-600">
                            {user && user.name}
                        </span>

                    </span>
                    <span className="flex items-center">
                        <button
                            onClick={handleLogout}
                            title="Logout"
                            className="outline-none focus:outline-none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    </span>
                </div>
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
                        aria-placeholder="Search"
                        placeholder="Search"
                        className="py-2 pl-10 pr-2 block w-full rounded bg-gray-100 border-none outline-0 focus:text-gray-700"
                        type="search"
                        name="search"
                        required
                        autoComplete="off"
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                    />
                </div>
            </div>

            <div className="scrollable pr-5 overflow-x-hidden overflow-y-auto shrink-0 md:w-80 xl:w-96 h-[calc(100vh-130px)]">
                <ul>
                    <div className="flex justify-between item-center my-3">
                        <h2 className=" text-gray-600 text-lg">
                            Chat
                        </h2>
                        <div className="flex items-center">
                            {user &&
                                userList.length !== 0 && < CreateRoom
                                    user={user}
                                    userList={userList}
                                    handleChatRoomID={handleChatRoomID}
                                />}
                        </div>
                    </div>


                    {user && searchChatRoomList.length !== 0 &&
                        searchChatRoomList
                            .sort((a, b) =>
                                b.chatroom.updatedAt.localeCompare(a.chatroom.updatedAt)
                            )
                            .map((item) => (
                                <ChatRoom
                                    user={user}
                                    room={item.chatroom}
                                    chatRoomID={chatRoomID}
                                    handleChatRoom={handleChatRoom}
                                    handleChatRoomID={handleChatRoomID}
                                    key={item.id}
                                />
                            ))}
                </ul>

                <ul className="border-t border-gray-200 pt-2 mt-2">

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
                                <User
                                    user={item}
                                    handleCreateChat={handleCreateChat}
                                    key={item.id}
                                />
                            ))}
                </ul>
            </div>
        </div>
    )
}

export default ChatSidebar
