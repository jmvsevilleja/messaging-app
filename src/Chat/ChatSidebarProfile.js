import React from "react";
import Picture from "./Picture";
import {Menu} from '@headlessui/react'

function ChatSidebarProfile({
    user,
    handleLogout,
    setOpenProfile,
    setOpenSetting,
}) {
    return (<div className="grow flex z-20">
        <Menu>
            <Menu.Button>
                <div className="flex cursor-pointer items-center">
                    {user && <Picture
                        name={user.name}
                        image={user.imageUri}
                        small={true}
                    />}

                    <div className="flex items-center text-gray-400 hover:text-gray-500">
                        <span className="block ml-2 font-bold text-base text-gray-600">
                            {user && user.name}
                        </span>
                        <svg className="w-3 h-3 shrink-0 ml-1 mb-1 fill-current" viewBox="0 0 12 12">
                            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                        </svg>
                    </div>
                </div>
            </Menu.Button>
            <Menu.Items className="absolute left-0 top-14 w-full bg-white text-gray-500 drop-shadow p-1 rounded" >
                <div className="text-base hover:bg-gray-100">
                    <Menu.Item>
                        <button className="w-full font-medium text-gray-600 text-left px-2 py-1 "
                            onClick={() => {
                                setOpenProfile(true);
                            }}
                        >Profile</button>
                    </Menu.Item>
                </div>
                <div className="text-base hover:bg-gray-100">
                    <Menu.Item>
                        <button className="w-full font-medium text-gray-600 text-left px-2 py-1"
                            onClick={() => {
                                setOpenSetting(true);
                            }}
                        >Settings</button>
                    </Menu.Item>
                </div>
                <div className="text-base hover:bg-gray-100">
                    <Menu.Item>
                        <button className="w-full font-medium text-gray-600 text-left px-2 py-1"
                            onClick={handleLogout}
                        >Sign Out</button>
                    </Menu.Item>
                </div>
            </Menu.Items>
        </Menu>
    </div>);
}

export default ChatSidebarProfile;