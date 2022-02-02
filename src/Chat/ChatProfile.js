import React, {useEffect, useState} from "react";
import Avatar from "react-avatar";

function ChatProfile({
    user,
    openProfile,
    handleCloseProfile,
}) {
    const [userName, setUserName] = useState(user.name);
    const [userStatus, setUserStatus] = useState(user.status);

    useEffect(() => {

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div>
            <div
                id="sidebar"
                className={"flex flex-col absolute z-40 left-0 top-0 w-full h-screen no-scrollbar  bg-white  duration-200 ease-in-out " + (openProfile ? "translate-x-0" : "-translate-x-full")}
            >
                <div className="justify-between item-center p-5">
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
                        <div className=" font-bold text-gray-600">Profile</div>
                    </div>
                </div>
                <div className="justify-between item-center p-5">
                    <div className="flex justify-center mb-10" >
                        <Avatar
                            size="150"
                            round={true}
                            name={user.name}
                        />
                    </div>

                    <div className="mb-5 relative text-gray-600 ">
                        <label className="text-base">Your Name:
                            <input
                                aria-placeholder="Group Name"
                                placeholder="Group Name"
                                type="text"
                                className="p-2 block w-full rounded bg-gray-100 border-none ring-0 outline-none"
                                required
                                onChange={(e) => {
                                    setUserName(e.target.value);
                                }}
                                value={userName}
                            />
                        </label>
                    </div>
                    <div className="relative text-gray-600">
                        <label className="text-base">About:
                            <input
                                aria-placeholder="Group Name"
                                placeholder="Group Name"
                                type="text"
                                className="p-2 block w-full rounded bg-gray-100 border-none ring-0 outline-none"
                                required
                                onChange={(e) => {
                                    setUserStatus(e.target.value);
                                }}
                                value={userStatus}
                            />
                        </label>
                    </div>
                </div>

            </div>

        </div>);
}

export default ChatProfile;
