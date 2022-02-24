import React from "react";

function ChatInfo({
    chatRoom,
    messageList,
    openInfoBookmark,
    handleCloseChatInfoBookmark,
}) {
    // const [userStatus, setUserStatus] = useState(user.status);
    const names = Object.fromEntries((chatRoom.users.map(item => [item.user.id, item.user.name])));

    return (
        <div>
            <div
                id="sidebar"
                className={"flex flex-col absolute z-40 left-0 top-0 w-full h-screen no-scrollbar bg-white dark:bg-slate-900 duration-200 ease-in-out transition-transform " + (openInfoBookmark ? "translate-x-0" : "translate-x-full")}
            >
                <div className="justify-between item-center p-5 py-8">
                    <div className="flex items-center justify-between" >
                        <div className=" font-bold text-gray-600 dark:text-white">Bookmarks</div>
                        <button
                            className="text-gray-400 hover:text-gray-500"
                            onClick={handleCloseChatInfoBookmark}
                        >
                            <span className="sr-only">Close</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>

                    </div>
                </div>
                <div className="scrollable px-10 overflow-x-hidden overflow-y-auto shrink-0 h-[calc(100vh-120px)]">
                    {messageList && messageList.filter((item) => item.bookmark === true).length === 0 && <div className="p-2 flex justify-center text-sm dark:text-slate-400">No Bookmarks</div>}
                    {messageList && messageList.length !== 0 && messageList
                        // sort messages oldest to newest client-side
                        .sort((a, b) =>
                            b.createdAt.localeCompare(
                                a.createdAt
                            )
                        )
                        .filter((item) => item.bookmark)
                        .map((message) => (<div key={message.id}>
                            {message.content && <>
                                <p className="text-xs text-primary dark:text-slate-400 font-medium">{names[message.userMessageId]}</p>
                                <div className="shadow-md mb-1 rounded-lg p-2 text-sm text-white bg-primary text-left">
                                    <p className={"text-sm xs:text-base" + (message.type === "LINK" ? " break-all" : "")}>
                                        {message.content}
                                    </p>
                                </div></>}
                        </div>))}
                </div>

            </div>

        </div >);
}

export default ChatInfo;
