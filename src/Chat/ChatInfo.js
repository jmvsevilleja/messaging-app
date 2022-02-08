import React, {useEffect, useState} from "react";
import Avatar from "react-avatar";
import UserChatInfo from "./userchatinfo";
import {editChatRoom, editChatRoomUser} from "../api/mutations";

function ChatInfo({
    user,
    chatRoom,
    openInfo,
    handleCloseInfo,
}) {
    const [notification, setNotification] = useState(false);
    // const [userStatus, setUserStatus] = useState(user.status);
    useEffect(() => {
        console.log('Notification', notification);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [notification]);

    const handleDeleteChatRoom = async () => {
        console.log('Handle Delete Chatroom', chatRoom);
        if (user.id !== chatRoom.chatRoomAdminId) return;
        await Promise.all(chatRoom.users
            .map(async (item) => {
                console.log('Delete chatroomuser', item.id);
                await editChatRoomUser({
                    id: item.id,
                    deleted: true
                })
            })).then(() => {
                console.log('Delete chatroom', chatRoom.id);
                editChatRoom({
                    id: chatRoom.id,
                    deleted: true,
                });
            });
    }
    return (
        <div
            id="rightsidebar"
            className={" bg-white absolute z-20 top-0 bottom-0 w-full md:w-60 lg:w-80 xl:w-96 md:static md:top-auto md:bottom-auto md:translate-x-0 transform transition-transform duration-200 ease-in-out border-0 md:border-l border-gray-200"
                + (openInfo ? " translate-x-0" : " hidden")}
        >
            <div className="justify-between item-center p-3 xs:p-5">
                <div className="flex justify-between items-center" >

                    <div className="font-bold text-gray-600"></div>
                    <button
                        className="text-gray-400 hover:text-gray-500"
                        onClick={handleCloseInfo}
                    >
                        <span className="sr-only">Close Info</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-11 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>

                    </button>
                </div>
            </div>
            <div className="flex flex-col items-center p-5 pt-0">
                {chatRoom.name && <Avatar
                    size="100"
                    round={true}
                    name={chatRoom.name}
                />}
                <div className="flex items-center">
                    <span className="block mt-4 ml-2 font-bold text-lg text-gray-600">
                        {chatRoom.name}
                    </span>
                </div>
                <span className="block ml-2 text-sm text-gray-600 truncate overflow-hidden">
                    {user && !chatRoom.group && user.status}
                </span>
            </div>
            <div className="flex flex-col py-5 mx-4">
                <div className="flex w-full justify-between items-center p-2">
                    <label
                        htmlFor="notif"
                        className="cursor-pointer text-md font-medium text-base text-gray-600"
                    >Notification
                    </label>
                    <div
                        className="relative inline-block w-12"
                    >
                        <input
                            type="checkbox"
                            name="notif"
                            id="notif"
                            className="bg-gray-100 border-bg-gray-100 mr-1 toggle-checkbox absolute block w-5 h-5 rounded-full border-2 appearance-none cursor-pointer outline-none focus:outline-none"
                            value={notification}
                            onClick={() => {
                                setNotification(!notification);
                            }}
                        />
                        <label
                            htmlFor="notif"
                            className="outline-none focus:outline-none toggle-label block h-7 -ml-1 -mt-1 rounded-full bg-gray-400 cursor-pointer"
                        ></label>
                    </div>
                </div>
                <div className="p-2">
                    <div className="flex text-gray-400 hover:text-gray-500">
                        <button className="flex w-full justify-between items-center outline-none focus:outline-none" >
                            <div className="text-md font-medium text-base text-gray-600 text-left">Media Link and Documents</div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="p-2">
                    <div className="flex text-gray-400 hover:text-gray-500">
                        <button className="flex w-full justify-between items-center outline-none focus:outline-none" >
                            <div className="text-md font-medium text-base text-gray-600">Bookmarks</div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
                {(chatRoom.chatRoomAdminId === user.id) && <div className="p-2">
                    <div className="flex text-gray-400 hover:text-gray-500">
                        <button className="flex w-full justify-between items-center outline-none focus:outline-none"
                            onClick={handleDeleteChatRoom}
                        >
                            <div className="text-md font-medium text-base text-gray-600">Delete chat</div>
                        </button>
                    </div>
                </div>}
                {chatRoom.group &&
                    <div className="mt-5">
                        <div className="flex justify-between items-center p-2 mx-5" >
                            <div className="flex font-bold text-sm text-primary text-left">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="28"
                                    height="18"
                                    fill="none"
                                    viewBox="0 0 28 18"
                                    className="fill-current text-primary"
                                >
                                    <path
                                        d="M7 0a5 5 0 100 10A5 5 0 007 0zM4 5a3 3 0 116 0 3 3 0 01-6 0zM14.908 5.218A2 2 0 0014 5V3a4 4 0 11-2.357 7.232l1.178-1.616a2 2 0 102.087-3.398zM17.998 18A3.999 3.999 0 0014 14.002V12a6.001 6.001 0 016 6h-2.002zM14 18h-2a5 5 0 00-10 0H0a7 7 0 1114 0z"
                                    ></path>
                                </svg>
                                {chatRoom.users.length} People</div>
                            <button className="text-gray-400 hover:text-gray-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="22"
                                    height="18"
                                    fill="none"
                                    viewBox="0 0 22 18"
                                    className="fill-current"
                                >
                                    <path
                                        d="M7 0a5 5 0 100 10A5 5 0 007 0zM4 5a3 3 0 116 0 3 3 0 01-6 0zM14 18h-2a5 5 0 00-10 0H0a7 7 0 1114 0zM19 14h-2v-3h-3V9h3V6h2v3h3v2h-3v3z"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                        <div className=" p-2">
                            <ul className="border-t border-gray-200 pt-2">
                                {chatRoom.users && chatRoom.users.length !== 0 &&
                                    chatRoom.users
                                        // sort user by name
                                        .sort((a, b) =>
                                            a.user.name.localeCompare(b.user.name)
                                        )
                                        .map((item) => (
                                            <UserChatInfo
                                                user={item.user}
                                                admin={chatRoom.chatRoomAdminId === item.user.id}
                                                you={user.id === item.user.id}
                                                key={item.id}
                                            />
                                        ))
                                }
                            </ul>
                        </div>
                    </div>}
            </div>
        </div>
    );
}

export default ChatInfo;
