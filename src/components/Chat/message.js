import React from "react";
import "./message.css";

export default function Message({message, isMe}) {
    return (
        <div
            className={
                isMe ? 'sentMessageContainer' : 'receivedMessageContainer'
            }
        >
            <p className={'senderText'}>{message.owner}</p>
            <div className={isMe ? 'sentMessage' : 'receivedMessage'}>
                <p>{message.message}</p>
            </div>
        </div>
    );
}
