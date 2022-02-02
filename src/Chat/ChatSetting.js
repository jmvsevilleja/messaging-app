import React from 'react';

function ChatSetting({
    openSetting,
    handleCloseSetting,
}) {
    return (
        <div>
            <div
                id="sidebar"
                className={"flex flex-col absolute z-40 left-0 top-0 w-full h-screen no-scrollbar  bg-gray-800  duration-200 ease-in-out " + (openSetting ? "translate-x-0" : "-translate-x-full")}
            >
                <button
                    className="text-gray-400 hover:text-gray-500 mr-4"
                    onClick={handleCloseSetting}
                >
                    <span className="sr-only">Close Setting</span>
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

            </div>

        </div>);
}

export default ChatSetting;
