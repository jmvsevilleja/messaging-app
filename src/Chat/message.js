import React from "react";
import "./message.css";

function Message({user_id, message, chatroom}) {
    let name = "";
    if (chatroom.users) {
        // get name from the users list
        const usersname = chatroom.users.find(i => i.user.id === message.userMessageId);
        if (usersname) {
            name = usersname.user.name
        }
    }
    const isme = user_id === message.userMessageId;
    var dateobj = new Date(message.createdAt);
    const created = dateobj.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true})

    return (
        <div
            className={
                "flex flex-col float-right m-2 " + (isme ? "justify-end items-end" : "justify-start items-start")
            }
        >
            {!isme && <p className="text-xs text-primary font-medium">{name}</p>}
            <div className={"break-all xl:break-normal xl:max-w-xl shadow-md mb-1 rounded-lg p-2 text-base text-left" + (isme ? " text-white bg-primary rounded-tr-none" : " text-black bg-gray-50 rounded-tl-none")}>
                <p>{message.content}</p>
            </div>
            <div className="flex items-center justify-between">
                <div className="mt-1 mr-1 text-xs text-gray-500 font-normal">{created}</div>
                {isme && message.status === "SENT" &&
                    <svg
                        className="w-3 h-3 shrink-0 fill-current text-gray-400"
                        viewBox="0 0 12 12"
                    >
                        <path
                            d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z"
                        />
                    </svg>
                }
                {isme && message.status === "READ" &&
                    <svg
                        className="w-5 h-3 shrink-0 fill-current text-green-500"
                        viewBox="0 0 20 12"
                    >
                        <path
                            d="M10.402 6.988l1.586 1.586L18.28 2.28a1 1 0 011.414 1.414l-7 7a1 1 0 01-1.414 0L8.988 8.402l-2.293 2.293a1 1 0 01-1.414 0l-3-3A1 1 0 013.695 6.28l2.293 2.293L12.28 2.28a1 1 0 011.414 1.414l-3.293 3.293z"
                        />
                    </svg>
                }
            </div>
        </div>
    );
}

export default Message;