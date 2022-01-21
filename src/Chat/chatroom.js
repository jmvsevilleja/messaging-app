import React from "react";
import Avatar from 'react-avatar';

function ChatRoom({room, chatRoomID, handleChatRoom, handleChatRoomID}) {
    return (
        <li>
            <button
                className={"hover:bg-indigo-100 p-2 my-1 rounded w-full cursor-pointer flex items-center text-sm focus:outline-none transition duration-150 ease-in-out " +
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
                        </span>

                        <span className="block ml-2 text-sm text-gray-600 text-left">5 minutes</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="block ml-2 text-sm text-gray-600 text-left">last message</span>
                        {room.newMessages && <div className="text-xs inline-flex font-medium bg-primary text-white rounded-full text-center leading-5 px-2">
                            {room.newMessages}
                        </div>}
                    </div>
                </div>
            </button>
        </li>
    )
}

export default ChatRoom

