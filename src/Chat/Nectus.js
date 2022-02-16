import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {getUserById, getAccountById, getChatRooms, getMessages} from "../api/queries";
import {addUser, addChatRoom, addChatRoomUser, editUser, editMessage, editChatRoom} from "../api/mutations";

import {
    subOnUpdateUser,
    subOnCreateMessageByChatRoomMessagesId,
    subOnUpdateMessageByChatRoomMessagesId,
    subOnUpdateChatRoomUserByChatRoomChatRoomUsersId,
} from "../api/subscriptions";

import ChatBody from "./ChatBody";
import ChatInfo from "./ChatInfo";

import "./index.css";

let subscriptions = {};

const Chat = () => {
    const [messageList, setMessageList] = useState([]);
    const [chatRoomList, setChatRoomList] = useState([]);
    const [user, setUser] = useState(null);
    const [chatRoom, setChatRoom] = useState({});
    const [openChat, setOpenChat] = useState(false);
    const [openInfo, setOpenInfo] = useState(false);

    const [forceOpenChat, setForceOpenChat] = useState(false); // force to open the chat room
    const [chatRoomID, setChatRoomID] = useState(null);
    let navigate = useNavigate();

    const handleUserOnline = (online) => {
        if (!user) return;
        // update offline status
        editUser({
            id: user.id,
            online: online
        });
    };

    const handleCreateUser = async (user_id) => {
        return getAccountById(user_id).then(async (user_detail) => {
            if (user_detail) {
                const name = user_detail.first_name + " " + user_detail.last_name;
                console.log("user not found create to users table", user_id, name);
                return await addUser(user_id, name).then((result) => {
                    //console.log('user created', result);
                    return {
                        id: result.id,
                        name: name,
                        status: result.status
                    };
                });
            }
        }
        );
    };

    const handleCreateChat = async (chatroom_list, selected_user) => {
        console.log("handleCreateChat", chatRoomList, user.id, selected_user.id);

        // check if user logged and selected_user is already in chat room
        const found_user = chatroom_list.find((room) => {
            if (!Boolean(room.chatroom.group)) { // not group chat
                let needle = [user.id, selected_user.id];
                var haystack = room.chatroom.chatRoomUsers.items.map(item => item.user.id);
                return needle.every(item => haystack.includes(item));
            }
            return false;
        });

        console.log('handleCreateChat Found', found_user);
        if (!Boolean(found_user)) {
            // Creating Chat Room
            const chatroom_name = user.name + " - " + selected_user.name;
            await addChatRoom(user.id, chatroom_name).then(async (chatroom) => {
                await addChatRoomUser(selected_user.id, chatroom.id).then(async () => {
                    await addChatRoomUser(user.id, chatroom.id).then(async () => {
                        handleChatRoomID(chatroom.id);
                    });
                });
            });

        } else {
            // open chatroom from users list
            handleChatRoomID(found_user.chatroom.id);
        }
    };

    const handleChatRoom = async (chatroom) => {
        console.log("handleChatRoom", chatroom);
        setMessageList([]);
        setOpenChat(true);
        setChatRoom({
            id: chatroom.id,
            name: chatroom.name,
            users: chatroom.chatRoomUsers.items,
            group: chatroom.group,
            lastMessage: chatroom.lastMessage,
            chatRoomAdminId: chatroom.chatRoomAdminId,
            imageUri: chatroom.imageUri,
        });

        // TODO: load the next 100 messages on scroll
        getMessages(chatroom.id).then((messages) => {
            setMessageList(messages);
            // Set All message to READ
            messages.forEach((item) => {
                if (item.userMessageId !== user.id && item.status !== "READ") {
                    //console.log('handleUnreadMessage', item);
                    handleUnreadMessage(item.id);
                }
            });
            // remove counter when messages are read
            messages.find((item) => {
                if (item.userMessageId !== user.id && item.status !== "READ") {
                    // update removing counter
                    handleCounterMessage(chatroom.id);
                    return true;
                }
                return false;
            });
        });

        // SUBSCRIPTIONS
        ['sub11', 'sub12', 'sub13'].forEach((item) => {
            if (subscriptions[item]) {
                subscriptions[item].unsubscribe();
            }
        });

        subscriptions.sub11 = subOnCreateMessageByChatRoomMessagesId(chatroom.id, ((value) => {
            setMessageList((list) => [
                ...list,
                value,
            ]);
            // set READ if your not the owner
            if (user && user.id !== value.userMessageId) {
                handleUnreadMessage(value.id);
            }
            // pass the last message and the counter
            if (user && user.id === value.userMessageId) {
                // update chatroom new message and add counter
                editChatRoom({
                    id: value.chatRoom.id,
                    newMessages: (value.chatRoom.newMessages * 1) + 1,
                    lastMessage: value.content
                });
            }
        }));
        subscriptions.sub12 = subOnUpdateMessageByChatRoomMessagesId(chatroom.id, ((value) => {
            if (value.userMessageId === user.id) {
                // Update all unread message status
                if (value.status === 'READ') {
                    setMessageList((list) =>
                        list.map((item) => item.id === value.id
                            ? {...item, status: value.status}
                            : item)
                    );
                    //     if (user && user.id === value.userMessageId) {
                    //         // update removing counter
                    //         handleCounterMessage(value.chatRoom.id);
                    //     }
                }
            }
            // remove deleted message
            if (value.deleted) {
                setMessageList((list) =>
                    list.filter((item) => !(item.id === value.id && !item.deleted))
                );
                return;
            }
            // update bookmark message
            setMessageList((list) =>
                list.map((item) => item.id === value.id
                    ? {...item, bookmark: value.bookmark}
                    : item)
            );
        }));
        subscriptions.sub13 = subOnUpdateChatRoomUserByChatRoomChatRoomUsersId(chatroom.id, ((value) => {
            // update typing/deleted in current chatroom
            setChatRoom((items) => {
                return {
                    ...items,
                    users: (items.users.map((item) =>
                        (item.id === value.id) ? {
                            ...item,
                            typing: value.typing,
                            deleted: value.deleted
                        } : item
                    ))
                }
            });
            // update deleted in chatroomlist
            setChatRoomList((list) => list.map((item) => {
                return {
                    ...item,
                    chatroom: {
                        ...item.chatroom,
                        chatRoomUsers: {
                            ...item.chatroom.chatRoomUsers,
                            items: (item.chatroom.chatRoomUsers.items.map((item) =>
                                (item.id === value.id) ? {
                                    ...item,
                                    deleted: value.deleted
                                } : item
                            ))
                        }
                    }
                };
            }));
        }));
    };

    const handleCounterMessage = async (chatroom_id) => {
        console.log("handleCounterMessage", chatroom_id);
        editChatRoom({
            id: chatroom_id,
            newMessages: 0,
        });
    };

    const handleUnreadMessage = async (message_id) => {
        console.log("handleUnreadMessage", message_id);
        editMessage({
            id: message_id,
            status: "READ",
        });
    };

    // Open chat toggle
    const handleCloseChat = async () => {
        setOpenChat(false);
    }
    const handleCloseInfo = async () => {
        setOpenInfo(false);
    }
    const handleOpenInfo = async () => {
        setOpenInfo(true);
    }

    // open chat room using room ID
    const handleChatRoomID = async (id) => {
        console.log('handleChatRoomID', id);
        // don't load chatroom if the same clicked
        if (chatRoomID !== id) {
            setChatRoomID(id);
            setForceOpenChat(true);
        }
        setOpenChat(true);
    }

    // OTHER FUNCTIONS
    const updateChatRoomList = async (chatroom) => {
        const name_chatroom = chatroom.map((room) => {
            if (!Boolean(room.chatroom.group)) {
                // Change name to the one you are chatting with
                const found_user = room.chatroom.chatRoomUsers.items.find((item) => {
                    return item.user.id !== user.id ? item.user.name : "";
                });
                if (found_user) {
                    room.chatroom.name = found_user.user.name;
                    room.chatroom.imageUri = found_user.user.imageUri;
                }
            }
            return room;
        });
        console.log('updateChatRoomList', name_chatroom);
        setChatRoomList([...name_chatroom]);
    };

    // USE EFFECTS
    useEffect(() => {
        if (user) return;
        const user_id = localStorage.getItem("user_id");
        // const auth_token = localStorage.getItem("auth_token");
        // const refresh_token = localStorage.getItem("refresh_token");

        // TODO: check user auth token if valid
        getUserById(user_id).then((user_found) => {
            setUser(user_found);
            if (user_id) {
                // check if logged user is in  users table. create if not found and query user details.
                if (!user_found) {
                    handleCreateUser(user_id).then((created_user) => {
                        setUser({
                            id: created_user.id,
                            name: created_user.name,
                            status: created_user.status,
                        });
                    });
                }
                // 'user found proceed to chat'
            } else {
                // 'auth not found goto login'
                navigate(`/`);
                return;
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // fetch Users and Chatroom once user is loaded
    useEffect(() => {
        if (!user) return;

        console.log("USER: ", user.id);

        // update online status
        //setInterval(function () {
        handleUserOnline(true);
        //}, 300 * 1000);

        // Handle creation of user and chatroom from to
        const to = localStorage.getItem("to");
        getUserById(to).then((user_found) => {
            // TODO: user not found then create user
            console.log('fetchUser to', to, user_found);
            if (!user_found) {
                handleCreateUser(to).then((created_user) => {
                    // user created now create chat room
                    if (created_user) {
                        getChatRooms(user.id).then((chatroom_list) => {
                            handleCreateChat(chatroom_list.length !== 0 ? chatroom_list : [], created_user).then(() => {
                                // get chatroom list
                                getChatRooms(user.id).then((chatroom_list) => {
                                    // set chatroom list
                                    updateChatRoomList(chatroom_list);
                                });
                            });
                        });
                    }

                });
            }
            // create chatroom
            if (user_found) {
                getChatRooms(user.id).then((chatroom_list) => {
                    handleCreateChat(chatroom_list.length !== 0 ? chatroom_list : [], user_found).then(() => {
                        // get chatroom list
                        getChatRooms(user.id).then((chatroom_list) => {
                            // set chatroom list
                            updateChatRoomList(chatroom_list);
                        });
                    });
                });
            }
        });

        // SUBSCRIPTIONS
        subscriptions.sub1 = subOnUpdateUser(((value) => {
            setChatRoomList((list) => list.map((items) => {
                return {
                    ...items,
                    chatroom: {
                        ...items.chatroom,
                        chatRoomUsers: {
                            ...items.chatroom.chatRoomUsers,
                            items: (items.chatroom.chatRoomUsers.items.map((item) =>
                                (item.user.id === value.id) ? {
                                    ...item,
                                    user: {
                                        ...item.user,
                                        online: value.online
                                    }
                                } : item
                            ))
                        }
                    }
                };
            }));
            // update online in current chatroom
            setChatRoom((items) => {
                if (items.users) {
                    return {
                        ...items,
                        users: (items.users.map((item) =>
                            (item.user.id === value.id) ? {
                                ...item,
                                user: {
                                    ...item.user,
                                    online: value.online
                                }
                            } : item
                        ))
                    }
                }
                return {
                    ...items,
                }
            });
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    // open room when chatroom is loaded
    useEffect(() => {
        if (chatRoomID && forceOpenChat) {
            if (chatRoomList.length) {
                console.log("useEffect chatRoomList Loaded", chatRoomList, chatRoomID);
                const user_found = chatRoomList.find(
                    (item) => item.chatroom.id === chatRoomID
                );
                //console.log('useEffect handleChatRoom Found', user_found);
                if (user_found) {
                    console.log('useEffect handleChatRoom Found', chatRoomID);
                    handleChatRoom(user_found.chatroom);
                    setForceOpenChat(false);
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatRoomID, forceOpenChat, chatRoomList]);

    //console.log('Rendering index.js');
    return (
        <div className="bg-white flex h-screen overflow-hidden">
            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-hidden">
                <main>
                    <div className="relative flex">
                        {/* Messages body */}
                        <ChatBody
                            nectus={true}
                            user={user}
                            openChat={openChat}
                            chatRoom={chatRoom}
                            messageList={messageList}
                            handleCloseChat={handleCloseChat}
                            handleOpenInfo={handleOpenInfo}
                        />
                    </div>
                </main>
            </div>
            <ChatInfo
                nectus={true}
                user={user}
                openInfo={openInfo}
                chatRoom={chatRoom}
                handleCloseInfo={handleCloseInfo}
            />
        </div>
    );
};

export default Chat;
