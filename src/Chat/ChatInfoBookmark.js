import React, {useEffect} from "react";

function ChatInfo({
    user,
    messageList,
    openInfoBookmark,
    handleCloseChatInfoBookmark,
}) {
    // const [userStatus, setUserStatus] = useState(user.status);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div>
            <div
                id="sidebar"
                className={"flex flex-col absolute z-40 left-0 top-0 w-full h-screen no-scrollbar bg-white duration-200 ease-in-out " + (openInfoBookmark ? "translate-x-0" : "translate-x-full")}
            >
                <div className="justify-between item-center p-5 py-8 bg-white">
                    <div className="flex items-center justify-between" >
                        <div className=" font-bold text-gray-600">Bookmarks</div>
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
                <div className="justify-between item-center p-5">
                    {messageList && messageList.filter((item) => item.pin === true).length === 0 && <div className="p-2 flex justify-center text-sm">No Bookmarks</div>}

                </div>

            </div>

        </div>);
}

export default ChatInfo;
