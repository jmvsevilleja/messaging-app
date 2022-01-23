import React, {useState} from "react";
import Avatar from "react-avatar";

import Message from "./message";
import ConvoLogo from '../logo.svg';

function ChatBody({
    user,
    chatRoom,
    openChat,
    messageList,
    handleSubmitMessage,
    handleCloseChat
}) {

    const [messageText, setMessageText] = useState("");
    const messageInput = React.useRef(null);

    return (
        <div
            className="bg-white grow flex flex-col md:translate-x-0 transform transition-transform duration-300 ease-in-out h-screen  overflow-hidden"
        >
            {!(openChat || Object.keys(chatRoom).length !== 0) && (
                <div className="h-screen w-full flex flex-col justify-center items-center">
                    <div className="">
                        <img className="h-96 w-96" src={ConvoLogo} alt="Convo" />
                    </div>
                </div>
            )}
            {Object.keys(chatRoom).length !== 0 && (
                <div className="w-full h-full flex flex-col overflow-hidden">
                    <div className="justify-between item-center border-b border-gray-300 p-3">
                        <span className="flex items-center overflow-hidden">
                            <button
                                className="md:hidden text-gray-400 hover:text-gray-500 mr-4"
                                onClick={handleCloseChat}
                            >
                                <span className="sr-only">Close sidebar</span>
                                <svg
                                    className="w-6 h-6 fill-current"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z"
                                    />
                                </svg>
                            </button>
                            {chatRoom && (
                                <Avatar
                                    size="40"
                                    round={true}
                                    name={chatRoom.name}
                                />
                            )}
                            <div className="w-full overflow-hidden">
                                <div className="flex items-center">
                                    <span className="block ml-2 font-bold text-base text-gray-600">
                                        {" "}
                                        {chatRoom && chatRoom.name}
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
                                </div>
                                {chatRoom.group &&
                                    <span className="block ml-2 text-sm text-gray-600 truncate overflow-hidden">
                                        {chatRoom.users
                                            .sort((a, b) => b.user.name.localeCompare(a.user.name))
                                            .map((item) => (
                                                item.user.name
                                            )).join(", ")}
                                    </span>}
                            </div>
                        </span>
                    </div>
                    <div
                        id="chat"
                        className="h-full p-5 overflow-y-auto relative flex-col-reverse flex text-center scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 xl:px-32"
                    >
                        {messageList
                            // sort messages oldest to newest client-side
                            .sort((a, b) =>
                                b.createdAt.localeCompare(
                                    a.createdAt
                                )
                            )
                            .map((message) => (
                                // map each message into the message component with message as props
                                <Message
                                    message={message}
                                    chatroom={chatRoom}
                                    user_id={user.id}
                                    key={message.id}
                                />
                            ))}
                    </div>
                    <form
                        onSubmit={(e) => {
                            setMessageText("");
                            handleSubmitMessage(e, messageText);
                            messageInput.current.focus();
                        }}
                        className="w-full flex py-3 px-3 items-center justify-between border-t border-gray-300"
                    >
                        <button className="outline-none focus:outline-none">
                            <svg
                                className="text-gray-400 h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                        </button>
                        <button className="outline-none focus:outline-none ml-1">
                            <svg
                                className="text-gray-400 h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                />
                            </svg>
                        </button>

                        <input
                            value={messageText}
                            onChange={(e) => {
                                setMessageText(
                                    e.target.value
                                );
                            }
                            }
                            aria-placeholder="Write message..."
                            placeholder="Write message..."
                            className="py-2 mx-3 pl-5 block w-full rounded-full bg-gray-100 border-none outline-0 focus:text-gray-700"
                            type="text"
                            id="message"
                            name="message"
                            required
                            autoComplete="off"
                            ref={messageInput}
                        ></input>

                        <button
                            className="outline-none focus:outline-none"
                            type="submit"
                            title="Submit"
                        >
                            <svg
                                className="text-gray-400 h-7 w-7 origin-center transform rotate-90"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                            </svg>
                        </button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default ChatBody
