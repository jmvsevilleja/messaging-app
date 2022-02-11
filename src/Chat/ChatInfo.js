import React, {useEffect, useState} from "react";

import UserChatInfo from "./userchatinfo";
import DeleteChatRoom from "./DeleteChatRoom";
import EditChatRoomUser from "./EditChatRoomUser";
import EditChatRoom from "./EditChatRoom";
import ExitChatRoom from "./ExitChatRoom";
import Picture from "./Picture";

import ChatInfoSearch from "./ChatInfoSearch";
import ChatInfoBookmark from "./ChatInfoBookmark";
import ChatInfoMedia from "./ChatInfoMedia";

function ChatInfo({
    nectus,
    user,
    chatRoom,
    chatRoomList,
    openInfo,
    handleCloseInfo,
}) {
    const [notification, setNotification] = useState(true);

    const [openInfoSearch, setOpenInfoSearch] = useState(false);
    const [openInfoBookmark, setOpenInfoBookmark] = useState(false);
    const [openInfoMedia, setOpenInfoMedia] = useState(false);

    const handleCloseChatInfoSearch = () => {
        setOpenInfoSearch(false);
    }
    const handleCloseChatInfoBookmark = () => {
        setOpenInfoBookmark(false);
    }
    const handleCloseChatInfoMedia = () => {
        setOpenInfoMedia(false);
    }

    useEffect(() => {
        //console.log('Notification', notification);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [notification]);


    return (
        <div
            id="rightsidebar"
            className={" bg-white z-20 w-full md:w-64 lg:w-80 xl:w-96 md:static top-auto bottom-auto transform transition-transform duration-200 ease-in-out border-0 md:border-l border-gray-200"
                + (openInfo ? " translate-x-0" : " translate-x-64 !w-0")}
        >
            {user && <ChatInfoSearch
                user={user}
                openInfoSearch={openInfoSearch}
                handleCloseChatInfoSearch={handleCloseChatInfoSearch} />}
            {user && <ChatInfoBookmark
                user={user}
                openInfoBookmark={openInfoBookmark}
                handleCloseChatInfoBookmark={handleCloseChatInfoBookmark} />}
            {user && <ChatInfoMedia
                user={user}
                openInfoMedia={openInfoMedia}
                handleCloseChatInfoMedia={handleCloseChatInfoMedia} />}

            <div className="justify-between item-center p-5 py-5 xs:py-8">
                <div className="flex justify-between items-center" >

                    <div className="font-bold text-gray-600"></div>
                    <button
                        className="text-gray-400 hover:text-gray-500"
                        onClick={handleCloseInfo}
                    >
                        <span className="sr-only">Close</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>

                    </button>
                </div>
            </div>
            <div className="flex flex-col items-center p-5 pt-0">
                <Picture
                    name={chatRoom.name}
                    image={chatRoom.imageUri}
                    big={true}
                />
                <div className="relative">
                    <div className="flex items-center mt-4 ml-2">
                        <span className="block font-bold text-lg text-gray-600">
                            {chatRoom.name}
                        </span>
                    </div>

                    {user && chatRoom.chatRoomAdminId === user.id && chatRoom.group && <EditChatRoom
                        user={user}
                        chatRoom={chatRoom}
                    />}
                </div>
                {user && !chatRoom.group && <span className="block text-sm text-gray-600 truncate overflow-hidden">
                    {user.status}
                </span>}
                {chatRoom.group && <span className="block text-sm text-gray-600 truncate overflow-hidden">
                    {chatRoom.users
                        .filter((item) => (
                            item.user.online
                        )).length + " "}
                    Online, from {chatRoom.users.filter((item) => !item.deleted).length} People
                </span>}
            </div>
            <div className="flex flex-col py-5 mx-4">
                <div className="flex w-full p-2 text-gray-400 hover:text-gray-500">
                    <div className="flex w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <div className="ml-4 text-md font-medium text-base text-gray-600">
                            <label
                                htmlFor="notif"
                                className="py-2 cursor-pointer"
                            >Notifications
                            </label></div>
                    </div>

                    <div
                        className="relative inline-block w-12"
                    >
                        <input
                            type="checkbox"
                            name="notif"
                            id="notif"
                            className="bg-gray-100 border-bg-gray-100 mr-1 toggle-checkbox absolute block w-5 h-5 rounded-full border-2 appearance-none cursor-pointer outline-none focus:outline-none"
                            checked={notification}
                            value={notification}
                            onChange={() => {
                                setNotification(!notification);
                            }}
                        />
                        <label
                            htmlFor="notif"
                            className="outline-none focus:outline-none toggle-label block h-7 -ml-1 -mt-1 rounded-full bg-gray-400 cursor-pointer"
                        ></label>
                    </div>
                </div>
                <div className="px-2">
                    <div className="flex text-gray-400 hover:text-gray-500">
                        <button className="py-2 flex w-full justify-between items-center outline-none focus:outline-none"
                            onClick={() => {
                                setOpenInfoSearch(true);
                            }}
                        >
                            <div className="flex w-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <div className="ml-4 text-md font-medium text-base text-gray-600 text-left">Search in Conversation</div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="px-2">
                    <div className="flex text-gray-400 hover:text-gray-500">
                        <button className="py-2 flex w-full justify-between items-center outline-none focus:outline-none"
                            onClick={() => {
                                setOpenInfoBookmark(true);
                            }}>
                            <div className="flex w-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                                <div className="ml-4 text-md font-medium text-base text-gray-600">Bookmarks</div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="px-2">
                    <div className="flex text-gray-400 hover:text-gray-500">
                        <button className="py-2 flex w-full justify-between items-center outline-none focus:outline-none"
                            onClick={() => {
                                setOpenInfoMedia(true);
                            }}>
                            <div className="flex w-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <div className="ml-4 text-md font-medium text-base text-gray-600 text-left">Media Link and Documents</div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>

                {user && !nectus && chatRoom.chatRoomAdminId === user.id && <DeleteChatRoom
                    user={user}
                    chatRoom={chatRoom}
                />}
                {user && !nectus && chatRoom.group && chatRoom.chatRoomAdminId !== user.id && <ExitChatRoom
                    user={user}
                    chatRoom={chatRoom}
                />}
                {chatRoom.group &&
                    <div className="mt-5">
                        <div className="flex justify-between items-center p-2" >
                            <div className="flex font-bold text-sm text-primary text-left">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="28"
                                    height="18"
                                    fill="none"
                                    viewBox="0 0 28 18"
                                    className="fill-current text-primary mr-3 ml-1"
                                >
                                    <path
                                        d="M7 0a5 5 0 100 10A5 5 0 007 0zM4 5a3 3 0 116 0 3 3 0 01-6 0zM14.908 5.218A2 2 0 0014 5V3a4 4 0 11-2.357 7.232l1.178-1.616a2 2 0 102.087-3.398zM17.998 18A3.999 3.999 0 0014 14.002V12a6.001 6.001 0 016 6h-2.002zM14 18h-2a5 5 0 00-10 0H0a7 7 0 1114 0z"
                                    ></path>
                                </svg>
                                {chatRoom.users.filter((item) => !item.deleted).length} People</div>
                            {user && chatRoom.chatRoomAdminId === user.id && <EditChatRoomUser
                                user={user}
                                chatRoom={chatRoom}
                                chatRoomList={chatRoomList}
                            />}
                        </div>
                        <div className="p-2">
                            <ul className="border-t border-gray-200 pt-2">
                                {chatRoom.users && chatRoom.users.length !== 0 &&
                                    chatRoom.users.filter((item) => !item.deleted)
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
        </div >
    );
}

export default ChatInfo;
