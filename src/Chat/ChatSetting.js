import React, {useEffect, useState} from "react";
import Picture from "./Picture";

function ChatSetting({
    user,
    openSetting,
    handleCloseSetting,
    handleOpenSettingQR,
}) {
    const [darkMode, setDarkMode] = useState(false);
    // const [userStatus, setUserStatus] = useState(user.status);

    useEffect(() => {

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <div
                id="sidebar"
                className={"flex flex-col absolute z-40 left-0 top-0 w-full h-screen no-scrollbar bg-white dark:bg-slate-900 duration-200 ease-in-out " + (openSetting ? "translate-x-0" : "-translate-x-full")}
            >
                <div className="justify-between item-center p-5 py-8">
                    <div className="flex items-center" >
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
                        <div className=" font-bold text-gray-600">Setting</div>
                    </div>
                </div>
                <div className="flex justify-between items-center border-b border-gray-300 p-5">

                    <Picture
                        name={user.name}
                        image={user.imageUri}
                        small={true}
                    />
                    <div className="w-full overflow-hidden">
                        <div className="flex items-center">
                            <span className="block ml-2 font-bold text-base text-gray-600">
                                {user.name}
                            </span>

                        </div>
                        <span className="block ml-2 text-sm text-gray-600 truncate overflow-hidden">
                            {user.status}
                        </span>
                    </div>

                    <button className="outline-0 text-primary"
                        onClick={handleOpenSettingQR}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            className="fill-current"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M0 10.667h10.667V0H0v10.667zm2.667-8H8V8H2.667V2.667zM0 24h10.667V13.333H0V24zm2.667-8H8v5.333H2.667V16zM13.333 0v10.667H24V0H13.333zm8 8H16V2.667h5.333V8zM24 21.333h-2.667V24H24v-2.667zM16 13.333h-2.667V16H16v-2.667zM18.667 16H16v2.667h2.667V16zM16 18.667h-2.667v2.666H16v-2.666zM18.667 21.333H16V24h2.667v-2.667z"
                            ></path>
                            <path
                                d="M21.333 18.667h-2.666v2.666h2.666v-2.666zM21.333 13.333h-2.666V16h2.666v-2.667zM24 16h-2.667v2.667H24V16z"
                            ></path>
                        </svg>
                    </button>

                </div>
                <div className="flex flex-col p-5 mx-4">
                    <div className="flex w-full justify-between items-center p-2">
                        <label
                            htmlFor="darkmode"
                            className="cursor-pointer text-md font-medium text-base text-gray-600"
                        >Night Mode
                        </label>
                        <div
                            className="relative inline-block w-12"
                        >
                            <input
                                type="checkbox"
                                name="darkmode"
                                id="darkmode"
                                className="bg-gray-100 border-bg-gray-100 mr-1 toggle-checkbox absolute block w-5 h-5 rounded-full border-2 appearance-none cursor-pointer outline-none focus:outline-none focus:ring-0 focus:ring-offset-0"
                                value={darkMode}
                                onChange={() => {
                                    setDarkMode(!darkMode);
                                }}
                            />
                            <label
                                htmlFor="darkmode"
                                className="outline-none focus:outline-none toggle-label block h-7 -ml-1 -mt-1 rounded-full bg-gray-400 cursor-pointer"
                            ></label>
                        </div>
                    </div>
                    <div className="p-2">

                        <div className="flex text-gray-400 hover:text-gray-500">
                            <button className="flex w-full justify-between items-center outline-none focus:outline-none" >
                                <div className="text-md font-medium text-base text-gray-600">Privacy and security</div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>

                    </div>
                    <div className=" p-2">
                        <div className="flex text-gray-400 hover:text-gray-500">
                            <button className="flex w-full justify-between items-center outline-none focus:outline-none" >
                                <div className="text-md font-medium text-base text-gray-600">About</div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>

                </div>
            </div>

        </div >);
}

export default ChatSetting;
