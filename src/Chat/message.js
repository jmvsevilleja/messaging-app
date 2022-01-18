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

    return (
        <div
            className={
                isme ? "sentMessageContainer" : "receivedMessageContainer"
            }
        >
            <p className="text-xs text-font">{name}</p>
            <div className={"p-2 text-base" + (isme ? " sentMessage text-white" : " receivedMessage text-font")}>
                <p>{message.content}</p>
            </div>
            {isme && <p className="text-xs">{message.status}</p>}
        </div>
    );
}

export default Message;