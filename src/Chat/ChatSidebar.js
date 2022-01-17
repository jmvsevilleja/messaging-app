import React from "react";
import Avatar from "react-avatar";

import User from "./user";
import ChatRoom from "./chatroom";

function ChatSidebar({user, userList, chatRoomList, handleLogout, handleChatRoom, handleChat}) {
    return (
        <>
            <div className="my-3 mx-3 ">
                <div className="flex justify-between item-center p-3 pl-0">
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
                    <span>
                        <button
                            onClick={handleLogout}
                            title="Logout"
                            className="outline-none focus:outline-none self-end"
                        >
                            <svg
                                className="h-8 w-8 text-gray-500"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                {" "}
                                <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                />{" "}
                                <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />{" "}
                                <path d="M7 12h14l-3 -3m0 6l3 -3" />
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
                        className="py-2 pl-10 block w-full rounded bg-gray-100 outline-none focus:text-gray-700"
                        type="search"
                        name="search"
                        required
                        autoComplete="search"
                    />
                </div>
            </div>

            <ul className="overflow-auto">
                {Boolean(chatRoomList.length) && (
                    <h2 className="ml-3 mb-2 text-gray-600 text-lg my-2">
                        Chat Room
                    </h2>
                )}

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

            <ul className="overflow-auto">
                <h2 className="ml-3 mb-2 text-gray-600 text-lg my-2">
                    Users
                </h2>

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
        </>
    )
}

export default ChatSidebar
