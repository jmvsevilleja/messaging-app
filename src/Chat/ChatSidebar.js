import React, {useEffect, useState} from "react";

import ChatRoom from "./chatroom";
import CreateRoom from "./CreateRoom";
import AddContact from "./AddContact";

import ChatProfile from "./ChatProfile";
import ChatSetting from "./ChatSetting";
import ChatSettingQR from "./ChatSettingQR";
import AvatarWithText from "./loader/AvatarWithText";
import ListingWithThumbnail from "./loader/ListingWithThumbnail";
import ChatSidebarProfile from "./ChatSidebarProfile";

function ChatSidebar({
    user,
    chatRoomID,
    openChat,
    chatRoomList,
    handleLogout,
    handleChatRoom,
    handleChatRoomID,
    toggleDarkMode,
    darkMode
}) {

    const [searchText, setSearchText] = useState("");
    const [searchChatRoomList, setSearchChatRoomList] = useState([]);
    const [openProfile, setOpenProfile] = useState(false);
    const [openSetting, setOpenSetting] = useState(false);
    const [openSettingQR, setOpenSettingQR] = useState(false);

    // Open chat toggle
    const handleCloseProfile = () => {
        setOpenProfile(false);
    }
    const handleCloseSetting = () => {
        setOpenSetting(false);
    }
    const handleOpenSettingQR = () => {
        setOpenSettingQR(true);
    }
    const handleCloseSettingQR = () => {
        setOpenSettingQR(false);
    }

    useEffect(() => {
        //setSearchUserList(userList);
        setSearchChatRoomList(chatRoomList);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatRoomList]);

    useEffect(() => {
        // setSearchUserList(userList.filter(item =>
        //     item.name.toLowerCase().includes(searchText.toLowerCase())
        // ));

        setSearchChatRoomList(chatRoomList.filter(item =>
            item.chatroom.name.toLowerCase().includes(searchText.toLowerCase())
        ));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchText]);

    return (
        <div
            id="messages-sidebar"
            className={"bg-white dark:bg-slate-900 absolute z-20 top-0 bottom-0 md:static md:top-auto md:bottom-auto md:translate-x-0 transform transition-transform duration-200 ease-in-out w-full md:w-72 lg:w-80 xl:w-96"
                + (!openChat ? " translate-x-0" : " -translate-x-full")}
        >

            {!user && <div className="my-3 px-5">
                <AvatarWithText height={80} width={200} className="-mb-3" />
            </div>}
            {user && <ChatProfile
                user={user}
                openProfile={openProfile}
                handleCloseProfile={handleCloseProfile} />}

            {user && <ChatSetting
                user={user}
                openSetting={openSetting}
                handleCloseSetting={handleCloseSetting}
                handleOpenSettingQR={handleOpenSettingQR}
                toggleDarkMode={toggleDarkMode}
                darkMode={darkMode}
            />}

            {user && <ChatSettingQR
                user={user}
                openSettingQR={openSettingQR}
                handleCloseSettingQR={handleCloseSettingQR} />}

            < div className="my-3 px-5">
                {user &&
                    <div className="flex relative justify-between item-center p-3 px-0 mb-6 pb-0">
                        <ChatSidebarProfile
                            user={user}
                            handleLogout={handleLogout}
                            setOpenProfile={setOpenProfile}
                            setOpenSetting={setOpenSetting}
                        />
                        <div className="flex items-center">
                            {user && <AddContact
                                user={user}
                                handleChatRoomID={handleChatRoomID}
                            />}
                        </div>

                        <div className="flex items-center">
                            {user && < CreateRoom
                                user={user}
                                chatRoomList={chatRoomList}
                                handleChatRoomID={handleChatRoomID}
                            />}
                        </div>

                    </div>}
                <div className="relative text-gray-600 focus-within:text-gray-400">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            className="w-6 h-6 text-gray-500"
                        >
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </span>
                    <input
                        aria-placeholder="Search"
                        placeholder="Search"
                        className="py-2 pl-10 pr-2 block w-full rounded bg-gray-100 border-none outline-0 focus:text-gray-700"
                        type="search"
                        name="search"
                        required
                        autoComplete="off"
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                    />
                </div>
            </div>

            <div className="scrollable px-5 overflow-x-hidden overflow-y-auto shrink-0 h-[calc(100vh-130px)] w-full md:w-72 lg:w-80 xl:w-96">
                {!user && <ListingWithThumbnail height={300} width={200} />}
                <ul>
                    {user && searchChatRoomList.length !== 0 &&
                        searchChatRoomList
                            .sort((a, b) =>
                                b.chatroom.updatedAt.localeCompare(a.chatroom.updatedAt)
                            )
                            .map((item) => (
                                <ChatRoom
                                    user={user}
                                    room={item.chatroom}
                                    chatRoomID={chatRoomID}
                                    handleChatRoom={handleChatRoom}
                                    handleChatRoomID={handleChatRoomID}
                                    key={item.id}
                                />
                            ))}
                </ul>
            </div>
        </div >
    )
}

export default ChatSidebar
