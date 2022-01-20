import React from "react";
import Avatar from "react-avatar";

import User from "./user";
import ChatRoom from "./chatroom";
import CreateRoom from "./CreateRoom";

function ChatSidebar({user, openChat, userList, chatRoomList, handleLogout, handleChatRoom, handleChat}) {
    return (
        <div
            id="messages-sidebar"
            className={" bg-white absolute z-20 pl-5 top-0 bottom-0 w-full md:w-auto md:static md:top-auto md:bottom-auto -mr-px md:translate-x-0 transform transition-transform duration-200 ease-in-out border-r border-gray-200"
                + (!openChat ? " translate-x-0" : " -translate-x-full")}

        >
            <div className="my-3 pr-5">
                <div className="flex justify-between item-center p-3 px-0">
                    <span className="flex items-center">
                        {user && (
                            <Avatar
                                size="40"
                                round={true}
                                name={user.name}
                            />
                        )}
                        <span className="block ml-2 font-bold text-base text-gray-600">
                            {" "}
                            {user && user.name}
                        </span>
                        <span className="connected text-green-500 ml-2">
                            <svg width="6" height="6">
                                <circle
                                    cx="3"
                                    cy="3"
                                    r="3"
                                    fill="currentColor"
                                ></circle>
                            </svg>
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
                    />
                </div>
            </div>

            <div className="scrollable pr-5 overflow-x-hidden overflow-y-auto shrink-0 md:w-72 xl:w-80 h-[calc(100vh-130px)]">
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
                                />}
                        </div>
                    </div>


                    {user &&
                        chatRoomList
                            .filter((item) => {
                                return item.id !== user.id;
                            })
                            // sort user by name
                            .sort((a, b) =>
                                a.name.localeCompare(b.name)
                            )
                            .map((item) => (
                                <ChatRoom
                                    user={item}
                                    handleChatRoom={
                                        handleChatRoom
                                    }
                                    key={item.id}
                                // unread={12}
                                />
                            ))}
                </ul>

                <ul className="border-t border-gray-200 pt-2 mt-2">

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
                                <User
                                    user={item}
                                    handleChat={handleChat}
                                    key={item.id}
                                />
                            ))}
                </ul>
            </div>
        </div>
    )
}

export default ChatSidebar
