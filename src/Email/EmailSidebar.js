import React from "react";

function ChatSidebar({
    user,
    openEmail
}) {

    return (
        <div
            id="messages-sidebar"
            className={"bg-white dark:bg-slate-900 absolute z-20 top-0 bottom-0 md:static md:top-auto md:bottom-auto md:translate-x-0 transform transition-transform duration-200 ease-in-out w-full md:w-72 lg:w-80 xl:w-96"
                + (!openEmail ? " translate-x-0" : " -translate-x-full")}
        >

            <div className="scrollable px-5 overflow-x-hidden overflow-y-auto shrink-0 h-[calc(100vh-130px)] w-full md:w-72 lg:w-80 xl:w-96">
                <ul>
                    <li>Email List</li>
                </ul>
            </div>
        </div >
    )
}

export default ChatSidebar
