import React, {useEffect, useState} from "react";
import {decryptMessage} from "../utilities/encryption";

function getTextWithHighlights(text, searchText) {
    const regex = new RegExp(searchText, 'gi');
    const newText = text.replace(regex, `<mark class="highlight">$&</mark>`);
    return <span dangerouslySetInnerHTML={{__html: newText}} />;
}

function ChatInfoSearch({
    chatRoom,
    messageList,
    openInfoSearch,
    handleCloseChatInfoSearch,
}) {
    const [searchText, setSearchText] = useState("");
    const [searchMessageList, setSearchMessageList] = useState([]);

    const getUserObject = (message) => {
        const message_user = chatRoom.users.find(item => (item.user.id === message.userMessageId));
        return {
            name: message_user ? message_user.user.name : "",
            public_key: message_user ? message_user.user.publicKey : ""
        }
    }

    useEffect(() => {
        if (!searchText) {
            setSearchMessageList([]);
            return;
        }
        // Decrypt messages.
        setSearchMessageList(messageList.map((item) => {
            return {
                ...item,
                content: decryptMessage(item.content, getUserObject(item).public_key)
            }
        }).filter(item =>
            item.content.toLowerCase().includes(searchText.toLowerCase())
        ));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchText, messageList]);

    return (
        <div>
            <div
                id="sidebar"
                className={"flex flex-col absolute z-40 left-0 top-0 w-full h-screen no-scrollbar bg-white dark:bg-slate-900 duration-200 ease-in-out transition-transform " + (openInfoSearch ? "translate-x-0" : "translate-x-full")}
            >
                <div className="justify-between item-center p-5 py-8">
                    <div className="flex items-center justify-between" >
                        <div className=" font-bold text-gray-600 dark:text-white">Search in Conversation</div>
                        <button
                            className="text-gray-400 hover:text-gray-500"
                            onClick={handleCloseChatInfoSearch}
                        >
                            <span className="sr-only">Close</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>

                        </button>
                    </div>
                </div>
                <div className="justify-between item-center pl-5">
                    <div className="relative text-gray-600 focus-within:text-gray-400 mb-5 mr-5">
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
                            className="py-2 pl-10 pr-2 block w-full rounded bg-gray-100 border-none outline-0 focus:text-gray-700"
                            type="search"
                            name="search"
                            required
                            autoComplete="off"
                            onChange={(e) => {
                                setSearchText(e.target.value);
                            }}
                        />
                    </div>
                    <div className="scrollable px-5 pr-10 overflow-x-hidden overflow-y-auto shrink-0 h-[calc(100vh-180px)]">
                        {searchMessageList && searchMessageList.length !== 0 && searchMessageList
                            // sort messages oldest to newest client-side
                            .sort((a, b) =>
                                b.createdAt.localeCompare(
                                    a.createdAt
                                )
                            )
                            .map((message) => (<div key={message.id}>
                                {message.content && <>
                                    <p className="text-xs text-primary dark:text-slate-400 font-medium">{getUserObject(message).name}</p>
                                    <div className="shadow-md mb-1 rounded-lg p-2 text-white bg-primary text-left">
                                        <p className={"text-sm xs:text-base" + (message.type === "LINK" ? " break-all" : "")}>
                                            {getTextWithHighlights(message.content, searchText)}
                                        </p>
                                    </div></>}
                            </div>))}
                    </div>
                </div>

            </div>

        </div>);
}

export default ChatInfoSearch;
