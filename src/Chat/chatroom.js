import React from "react";
import Avatar from 'react-avatar';

function ChatRoom({room, chatRoomID, unread, handleChatRoom, handleChatRoomID}) {
    return (
        <li>
            <button
                className={"hover:bg-indigo-100 p-2 my-1 rounded w-full cursor-pointer flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out " +
                    (chatRoomID === room.id ? "bg-indigo-100" : "")}
                onClick={() => {
                    //handleChatRoom(room);
                    handleChatRoomID(room.id);
                }}>

                {room && <Avatar size="40" round={true} name={room.name} />}
                <div className="w-full pb-2">
                    <div className="flex justify-between">
                        <span className="block ml-2 font-medium text-base text-gray-600 text-left">
                            {room.name}
                            {unread && <Avatar className="ml-1" size="20" round={true} value={unread} color="red" textSizeRatio={1.75} />}
                        </span>

                        <span className="block ml-2 text-sm text-gray-600 text-left">5 minutes</span>
                    </div>
                    <span className="block ml-2 text-sm text-gray-600 text-left">last message here</span>
                </div>
            </button>
        </li>
    )
}

export default ChatRoom

