import React from "react";
import Avatar from 'react-avatar';

export default function ChatRoom({user, handleChatRoom}) {
    return (
        <li>
            <div className="hover:bg-gray-100  px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out" onClick={() => {
                handleChatRoom(user)
            }}>

                {user && <Avatar size="40" round={true} name={user.name} />}
                <div className="w-full pb-2">
                    <div className="flex justify-between">
                        <span className="block ml-2 font-semibold text-base text-gray-600 ">{user.name}</span>
                        <span className="block ml-2 text-sm text-gray-600">5 minutes</span>
                    </div>
                    <span className="block ml-2 text-sm text-gray-600">{user.status}</span>
                </div>
            </div>
        </li>
    );
}

