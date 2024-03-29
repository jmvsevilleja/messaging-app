import React from "react";
import {Menu} from '@headlessui/react'
import {editMessage} from "../api/mutations";

function MessageDropdown({isme, message}) {

    const handleDelete = () => {
        editMessage({
            id: message.id,
            deleted: true,
        });
    }

    const handleBookmark = () => {
        editMessage({
            id: message.id,
            bookmark: !message.bookmark,
        });
    }

    return (<>
        {(message.type === 'TEXT' || message.type === "LINK" || isme) && <div className="z-10 px-2 absolute -right-1 top-1">
            <Menu as="div" className="inline-block text-left">
                <Menu.Button className="text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </Menu.Button>
                <Menu.Items className={"absolute top-5 bg-white text-gray-500 drop-shadow p-1 rounded " + ((isme) ? "right-2" : "left-2")}>
                    {(message.type === 'TEXT' || message.type === "LINK") && <div className="text-sm px-2 py-1 hover:bg-gray-100">
                        <Menu.Item>
                            <button
                                className="w-full text-left"
                                onClick={() => {
                                    handleBookmark();
                                }}
                            >{message.bookmark ? "Unbookmark" : "Bookmark"}</button>
                        </Menu.Item>
                    </div>}
                    {isme && <div className="text-sm px-2 py-1 hover:bg-gray-100">
                        <Menu.Item>
                            <button
                                className="w-full text-left"
                                onClick={() => {
                                    handleDelete();
                                }}
                            >Delete</button>
                        </Menu.Item>
                    </div>}
                </Menu.Items>
            </Menu>
        </div>}
    </>
    );
}

export default MessageDropdown;