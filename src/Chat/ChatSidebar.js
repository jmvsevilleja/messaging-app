import React, {useEffect, useState, useRef} from "react";
import Avatar from "react-avatar";

import ChatRoom from "./chatroom";
import CreateRoom from "./CreateRoom";
import InviteUser from "./InviteUser";

import ChatProfile from "./ChatProfile";
import ChatSetting from "./ChatSetting";
import ChatSettingQR from "./ChatSettingQR";
import AvatarWithText from "./loader/AvatarWithText";
import ListingWithThumbnail from "./loader/ListingWithThumbnail";

function ChatSidebar({
    user,
    chatRoomID,
    openChat,
    chatRoomList,
    handleLogout,
    handleChatRoom,
    handleChatRoomID,
}) {

    const [searchText, setSearchText] = useState("");
    const [searchChatRoomList, setSearchChatRoomList] = useState([]);
    const [openProfile, setOpenProfile] = useState(false);
    const [openSetting, setOpenSetting] = useState(false);
    const [openSettingQR, setOpenSettingQR] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const dropdownMenu = useRef(null)

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
    const handleCloseDropdown = (e) => {
        if (dropdownMenu.current && !dropdownMenu.current.contains(e.target)) {
            setDropdown(false);
        }
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
    useEffect(() => {
        document.addEventListener('click', handleCloseDropdown);
        return () => {
            document.removeEventListener("click", handleCloseDropdown);
        };
    }, []);
    return (
        <div
            id="messages-sidebar"
            className={" bg-white absolute z-20 pl-5 top-0 bottom-0 w-full md:w-auto md:static md:top-auto md:bottom-auto -mr-px md:translate-x-0 transform transition-transform duration-200 ease-in-out"
                + (!openChat ? " translate-x-0" : " -translate-x-full")}
        >

            {!user && <div className="my-3 pr-5">
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
            />}

            {user && <ChatSettingQR
                user={user}
                openSettingQR={openSettingQR}
                handleCloseSettingQR={handleCloseSettingQR} />}

            < div className="my-3 pr-5">
                {user &&
                    <div className="flex relative justify-between item-center p-3 px-0 mb-6 pb-0 ">
                        <div
                            className="grow flex"

                        >   <div className="flex cursor-pointer items-center" onMouseDown={() => {
                            setDropdown(true);
                        }}
                            ref={dropdownMenu}>
                                {user && (
                                    <div className="relative">
                                        <Avatar
                                            size="40"
                                            round={true}
                                            name={user.name}
                                        />
                                        <div className={"absolute bottom-0 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"}></div>
                                    </div>
                                )}

                                <span className="block ml-2 font-bold text-base text-gray-600">
                                    {user && user.name}
                                </span>
                                <svg className="w-3 h-3 shrink-0 ml-1 mb-1 fill-current text-gray-400" viewBox="0 0 12 12">
                                    <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                </svg>

                                {dropdown &&
                                    <div
                                        className="origin-top-right z-50 absolute top-full left-0 bg-white border border-gray-200 p-1.5  rounded shadow-lg overflow-hidden mt-1 w-full md:w-1/2"
                                    >
                                        <ul>
                                            <li>
                                                <button className="w-full font-medium text-sm text-gray-600 hover:bg-gray-100 px-3 py-1.5 text-left"
                                                    onClick={() => {
                                                        setOpenProfile(true);
                                                        setDropdown(false);
                                                    }}
                                                >Profile</button>
                                            </li>
                                            <li>
                                                <button className="w-full font-medium text-sm text-gray-600 hover:bg-gray-100 px-3 py-1.5 text-left"
                                                    onClick={() => {
                                                        setOpenSetting(true);
                                                        setDropdown(false);
                                                    }}
                                                >Settings</button>
                                            </li>
                                            <li>
                                                <button className="w-full font-medium text-sm text-gray-600 hover:bg-gray-100 px-3 py-1.5 text-left"
                                                    onClick={handleLogout}
                                                >Sign Out</button>
                                            </li>
                                        </ul>
                                    </div>}

                            </div>

                        </div>
                        <div className="flex items-center">
                            {user && < InviteUser
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

            <div className="scrollable pr-5 overflow-x-hidden overflow-y-auto shrink-0 md:w-80 xl:w-96 h-[calc(100vh-130px)]">
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

                {/* <ul className="border-t border-gray-200 pt-2 mt-2">

                    {user && searchUserList.length !== 0 &&
                        searchUserList
                            .filter((item) => {
                                return item.id !== user.id;
                            })
                            // sort user by name
                            .sort((a, b) =>
                                a.name.localeCompare(b.name)
                            )
                            .map((item) => (
                                <User
                                    user={item}
                                    handleCreateChat={handleCreateChat}
                                    key={item.id}
                                />
                            ))}
                </ul> */}
            </div>
        </div >
    )
}

export default ChatSidebar
