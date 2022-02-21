import React from "react";

import EditChatProfile from "./EditChatProfile";
import Picture from "./Picture";

function ChatProfile({
    user,
    openProfile,
    handleCloseProfile,
}) {

    return (
        <div>
            <div
                id="sidebar"
                className={"flex flex-col absolute z-40 left-0 top-0 w-full h-screen no-scrollbar  bg-white dark:bg-slate-900  duration-200 ease-in-out " + (openProfile ? "translate-x-0" : "-translate-x-full")}
            >
                <div className="justify-between item-center p-5 py-8">
                    <div className="flex items-center" >
                        <button
                            className="text-gray-400 hover:text-gray-500 mr-4"
                            onClick={handleCloseProfile}
                        >
                            <span className="sr-only">Close Profile</span>
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
                        <div className=" font-bold text-gray-600 dark:text-white">Profile</div>
                    </div>
                </div>
                <div className="flex flex-col items-center p-5 pt-0">
                    <Picture
                        name={user.name}
                        image={user.imageUri}
                        big={true}
                    />
                    <div className="relative">
                        <div className="flex items-center mt-4 ml-2">
                            <span className="block font-bold text-lg text-gray-600">
                                {user.name}
                            </span>
                        </div>

                        {user && <EditChatProfile
                            user={user}
                        />}
                    </div>
                    {user && <span className="block text-sm text-gray-600 truncate overflow-hidden">
                        {user.status}
                    </span>}

                </div>
            </div>

        </div>);
}

export default ChatProfile;
