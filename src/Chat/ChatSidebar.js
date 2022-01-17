import React from "react";
import Avatar from "react-avatar";

import User from "./user";
import ChatRoom from "./chatroom";
import CreateRoom from "./CreateRoom";

function ChatSidebar({user, userList, chatRoomList, handleLogout, handleChatRoom, handleChat}) {
    return (
        <>
            <div className="my-3 mx-3 ">
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
                    <span class="flex items-center">
                        <button
                            onClick={handleLogout}
                            title="Logout"
                            className="outline-none focus:outline-none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                        className="py-2 pl-10 block w-full rounded bg-gray-100 outline-none focus:text-gray-700"
                        type="search"
                        name="search"
                        required
                        autoComplete="search"
                    />
                </div>
            </div>

            <ul className="overflow-auto">
                <div className="flex justify-between item-center">
                    <h2 className="ml-3 mb-2 text-gray-600 text-lg my-2">
                        Chat Room
                    </h2>
                    <div className="mr-3 mb-2 my-2">
                        <CreateRoom />
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
