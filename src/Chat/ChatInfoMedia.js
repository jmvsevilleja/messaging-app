import React, {useEffect, useState} from "react";
import {Tab} from '@headlessui/react'
import Media from "./media"

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function ChatInfo({
    user,
    messageList,
    openInfoMedia,
    handleCloseChatInfoMedia,
}) {
    // const [userStatus, setUserStatus] = useState(user.status);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let [categories] = useState({
        Media: [],
        Links: [],
        Documents: [],
    })

    return (
        <div>

            <div
                id="sidebar"
                className={"flex flex-col absolute z-40 left-0 top-0 w-full h-screen no-scrollbar bg-white duration-200 ease-in-out " + (openInfoMedia ? "translate-x-0" : "translate-x-full")}
            >

                <div className="justify-between item-center p-5 py-8 bg-white">
                    <div className="flex items-center justify-between" >
                        <div className=" font-bold text-gray-600">Media Links and Documents</div>
                        <button
                            className="text-gray-400 hover:text-gray-500"
                            onClick={handleCloseChatInfoMedia}
                        >
                            <span className="sr-only">Close</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>

                        </button>
                    </div>
                </div>


                <Tab.Group>
                    <Tab.List className="flex">
                        {Object.keys(categories).map((category) => (
                            <Tab
                                key={category}
                                className={({selected}) =>
                                    classNames(
                                        'w-full py-2.5 text-md font-bold text-gray-400 hover:text-gray-500',
                                        selected
                                            ? 'text-primary'
                                            : 'text-gray-400'
                                    )
                                }
                            >
                                {category}
                            </Tab>
                        ))}
                    </Tab.List>

                    <Tab.Panels className="mt-2">
                        {Object.keys(categories).map((post, idx) => (
                            <Tab.Panel
                                key={idx}
                            >
                                <div className="scrollable px-5 overflow-x-hidden overflow-y-auto shrink-0 h-[calc(100vh-130px)]" >
                                    {post === "Media" && <>
                                        {messageList && messageList.filter((item) => item.type === 'IMAGE').length === 0 && <div className="p-2 flex justify-center text-sm">No media</div>}
                                        {messageList && messageList.filter((item) => item.type === 'IMAGE').length !== 0 && <div className="justify-between item-center px-5 grid grid-cols-1 xs:grid-cols-2">
                                            {messageList
                                                // sort messages oldest to newest client-side
                                                .filter((item) => item.type === 'IMAGE')
                                                .sort((a, b) =>
                                                    b.createdAt.localeCompare(
                                                        a.createdAt
                                                    )
                                                )
                                                .map((message) => (
                                                    // map each message into the message component with message as props
                                                    <Media
                                                        message={message}
                                                        key={message.id}
                                                    />
                                                ))}
                                        </div>}
                                    </>}
                                    {post === "Documents" && <>
                                        {messageList && messageList.filter((item) => item.type === 'FILE').length === 0 && <div className="p-2 flex justify-center text-sm">No Documents</div>}
                                        {messageList && messageList.filter((item) => item.type === 'FILE').length !== 0 && <div className="justify-between item-center px-5">
                                            {messageList
                                                // sort messages oldest to newest client-side
                                                .filter((item) => item.type === 'FILE')
                                                .sort((a, b) =>
                                                    b.createdAt.localeCompare(
                                                        a.createdAt
                                                    )
                                                )
                                                .map((message) => (
                                                    // map each message into the message component with message as props
                                                    <Media
                                                        message={message}
                                                        key={message.id}
                                                    />
                                                ))}
                                        </div>}
                                    </>}
                                    {post === "Links" && <>
                                        {messageList && messageList.filter((item) => item.type === 'LINK').length === 0 && <div className="p-2 flex justify-center text-sm">No Links</div>}
                                        {messageList && messageList.filter((item) => item.type === 'LINK').length !== 0 && <div className="justify-between item-center px-5">
                                            {messageList
                                                // sort messages oldest to newest client-side
                                                .filter((item) => item.type === 'LINK')
                                                .sort((a, b) =>
                                                    b.createdAt.localeCompare(
                                                        a.createdAt
                                                    )
                                                )
                                                .map((message) => (
                                                    // map each message into the message component with message as props
                                                    <Media
                                                        message={message}
                                                        key={message.id}
                                                    />
                                                ))}
                                        </div>}
                                    </>}
                                </div>
                            </Tab.Panel>
                        ))}
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>);
}

export default ChatInfo;
