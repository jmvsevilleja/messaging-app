import React from "react";
import "./message.css";

export default function Message({user_id, message, chatroom}) {
    let name = '';
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
                isme ? 'sentMessageContainer' : 'receivedMessageContainer'
            }
        >
            <p className={'senderText'}>{name}</p>
            <div className={isme ? 'sentMessage' : 'receivedMessage'}>
                <p>{message.content}</p>
            </div>
        </div>
    );
}
