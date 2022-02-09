import React from "react";
import Avatar from 'react-avatar';

function ChatRoom({user, room, chatRoomID, handleChatRoomID}) {
    var dateobj = new Date(room.updatedAt);
    const updated = dateobj.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true})
    const online = room.chatRoomUsers.items.find((item) => ((room.group || user.id !== item.user.id) && item.user.online));

    return (
        <li>
            <button
                className={"hover:bg-indigo-100 p-2 my-3 rounded w-full cursor-pointer flex items-center text-sm focus:outline-none transition duration-150 ease-in-out " +
                    (chatRoomID === room.id ? "bg-indigo-100" : "")}
                onClick={() => {
                    handleChatRoomID(room.id);
                }}>

                <div className="relative">
                    {!room.imageUri && room && <Avatar size="40" round={true} name={room.name} />}
                    {room.imageUri && <div className="w-10"><img
                        src={room.imageUri}
                        className="rounded-full object-cover h-10 w-10"
                    /></div>}
                    <div className={"absolute bottom-0 right-1 w-3 h-3 border-2 border-white rounded-full " + (online ? "bg-green-500" : "bg-gray-500")}></div>
                </div>

                <div className="w-full overflow-hidden">
                    <div className="flex justify-between">
                        <span className="block ml-2 font-medium text-base text-gray-600 text-left">
                            {room.name}
                        </span>

                        <span className="block ml-2 text-sm text-gray-600 text-left">{updated}</span>
                    </div>
                    <div className="flex justify-between overflow-hidden">
                        <div className="ml-2 pr-5 text-sm text-gray-600 text-left truncate overflow-hidden">{Boolean(room.lastMessage) && room.lastMessage}</div>
                        {Boolean(room.newMessages) && <div className="text-xs inline-flex font-medium bg-primary text-white rounded-full text-center leading-5 px-2">
                            {room.newMessages}
                        </div>}
                    </div>
                </div>
            </button>
        </li>
    )
}

export default ChatRoom

