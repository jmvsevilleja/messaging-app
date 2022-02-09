import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {API, graphqlOperation} from "aws-amplify";
import {getUserById, getAccountById, getChatRooms, getMessages} from "../api/queries";
import {addUser, editUser, editMessage, editChatRoom} from "../api/mutations";

import {
    //onCreateUser,
    onUpdateUser,
    onUpdateChatRoom,
    onCreateChatRoomUserByChatRoomUserUserId,
    onCreateMessageByChatRoomMessagesId,
    onUpdateMessageByChatRoomMessagesId,
    onUpdateChatRoomUserByChatRoomChatRoomUsersId,
} from "../graphql/custom-subscriptions";

import ChatSidebar from "./ChatSidebar";
import ChatBody from "./ChatBody";
import ChatInfo from "./ChatInfo";

//import axios from "axios";
import "./index.css";

let subs = {
    subCreateChatRoomUser: null,
    subCreateUser: null,
    subUpdateUser: null,
    subUpdateChatRoom: null,
    subCreateMessage: null,
    subUpdateMessage: null,
    subUpdateChatRoomUser: null,
};

const Chat = () => {
    const [messageList, setMessageList] = useState([]);
    const [chatRoomList, setChatRoomList] = useState([]);
    const [user, setUser] = useState(null);
    const [chatRoom, setChatRoom] = useState({});
    const [openChat, setOpenChat] = useState(false);
    const [openInfo, setOpenInfo] = useState(false);

    const [forceOpenChat, setForceOpenChat] = useState(false);
    const [chatRoomID, setChatRoomID] = useState(null);
    let navigate = useNavigate();

    // HANDLE FUNCTIONS
    const handleLogout = async () => {
        localStorage.removeItem("user_id");
        localStorage.removeItem("auth_login");
        localStorage.removeItem("auth_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("access_token");
        document.cookie = "auth_login=; Max-Age=-99999999;";
        document.cookie = "token=; Max-Age=-99999999;";
        // unsubscribe
        for (const item in subs) {
            if (subs[item]) {
                subs[item].unsubscribe();
            }
        }
        handleUserOnline(false);
        navigate(`/`);
    };

    const handleUserOnline = (online) => {
        if (!user) return;
        // update offline status
        editUser({
            id: user.id,
            online: online
        })
    };

    const handleCreateUser = async (user_id) => {
        getAccountById(user_id).then((user_detail) => {
            if (user_detail) {
                const name = user_detail.first_name + " " + user_detail.last_name;
                console.log("user not found create to users table", user_id, name);
                addUser(user_id, name).then((result) => {
                    //console.log('user created', result);
                    setUser({
                        id: result.id,
                        name: name,
                        status: result.status
                    });
                });
            }
        }
        );
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
        });

        if (subs.subCreateMessage) {
            subs.subCreateMessage.unsubscribe();
        }
        if (subs.subUpdateMessage) {
            subs.subUpdateMessage.unsubscribe();
        }
        if (subs.subUpdateChatRoomUser) {
            subs.subUpdateChatRoomUser.unsubscribe();
        }
        //console.log('Subscribe to onCreateMessageByChatRoomMessagesId');
        subs.subCreateMessage = API.graphql(
            graphqlOperation(onCreateMessageByChatRoomMessagesId, {chatRoomMessagesId: chatroom.id})
        ).subscribe({
            next: ({provider, value}) => {
                console.log("onCreateMessageByChatRoomMessagesId", value);
                setMessageList((list) => [
                    ...list,
                    value.data.onCreateMessageByChatRoomMessagesId,
                ]);

                // set READ if your not the owner
                if (user && user.id !== value.data.onCreateMessageByChatRoomMessagesId.userMessageId) {
                    handleUnreadMessage(value.data.onCreateMessageByChatRoomMessagesId.id);
                }

                // pass the last message and the counter
                if (user && user.id === value.data.onCreateMessageByChatRoomMessagesId.userMessageId) {
                    console.log('onCreateMessageByChatRoomMessagesId', value.data.onCreateMessageByChatRoomMessagesId);
                    // update chatroom new message and add counter
                    editChatRoom({
                        id: value.data.onCreateMessageByChatRoomMessagesId.chatRoom.id,
                        newMessages: (value.data.onCreateMessageByChatRoomMessagesId.chatRoom.newMessages * 1) + 1,
                        lastMessage: value.data.onCreateMessageByChatRoomMessagesId.content
                    });
                    //console.log("Updated Chatroom", updated_chatroom);
                }
            },
            error: (error) => console.warn(error),
        });

        //console.log('Subscribe to onUpdateMessageByChatRoomMessagesId');
        subs.subUpdateMessage = API.graphql(
            graphqlOperation(onUpdateMessageByChatRoomMessagesId, {
                chatRoomMessagesId: chatroom.id,
            })
        ).subscribe({
            next: ({provider, value}) => {
                console.log("onUpdateMessageByChatRoomMessagesId", value);
                if (value.data.onUpdateMessageByChatRoomMessagesId.userMessageId === user.id) {
                    // Update all message status
                    setMessageList((list) =>
                        list.map((item) => item.id === value.data.onUpdateMessageByChatRoomMessagesId.id
                            ? {...item, status: value.data.onUpdateMessageByChatRoomMessagesId.status}
                            : item)
                    );
                    if (user && user.id === value.data.onUpdateMessageByChatRoomMessagesId.userMessageId) {
                        // update removing counter
                        handleCounterMessage(value.data.onUpdateMessageByChatRoomMessagesId.chatRoom.id);
                    }
                }
            },
            error: (error) => console.warn(error),
        });

        console.log("Subscribe to onUpdateChatRoomUserByChatRoomChatRoomUsersId");
        subs.subUpdateChatRoomUser = API.graphql(
            graphqlOperation(onUpdateChatRoomUserByChatRoomChatRoomUsersId, {
                chatRoomChatRoomUsersId: chatroom.id,
            })
        ).subscribe({
            next: ({provider, value}) => {
                console.log("onUpdateChatRoomUserByChatRoomChatRoomUsersId", value);
                // update typing in current chatroom
                setChatRoom((items) => {
                    //console.log('VALUE', items, value);
                    const users = items.users.map((item) =>
                        (item.id === value.data.onUpdateChatRoomUserByChatRoomChatRoomUsersId.id) ? {
                            ...item,
                            typing: value.data.onUpdateChatRoomUserByChatRoomChatRoomUsersId.typing
                        } : item
                    );
                    return {
                        ...items,
                        users
                    }
                });

            },
            error: (error) => console.warn(error),
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
                const modifiedname = room.chatroom.chatRoomUsers.items.find((item) => {
                    return item.user.id !== user.id ? item.user.name : "";
                });
                if (modifiedname) {
                    room.chatroom.name = modifiedname.user.name;
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

        getUserById(user_id).then((user_found) => {
            setUser(user_found);
            if (user_id) {
                // check if logged user is in  users table. create if not found and query user details.
                if (!user_found) {
                    handleCreateUser(user_id);
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

        getChatRooms(user.id).then((result) => {
            updateChatRoomList(result);
        });

        console.log("Subscribe to onCreateChatRoomUserByChatRoomUserUserId");
        subs.subCreateChatRoomUser = API.graphql(
            graphqlOperation(onCreateChatRoomUserByChatRoomUserUserId, {
                chatRoomUserUserId: user.id,
            })
        ).subscribe({
            next: ({provider, value}) => {
                console.log("onCreateChatRoomUserByChatRoomUserUserId", value);
                getChatRooms(user.id).then((result) => {
                    updateChatRoomList(result);
                    if (value.data.onCreateChatRoomUserByChatRoomUserUserId.chatRoomUserUserId !== user.id) {
                        handleChatRoomID(value.data.onCreateChatRoomUserByChatRoomUserUserId.chatRoomChatRoomUsersId);
                    }
                });
            },
            error: (error) => console.warn(error),
        });

        console.log("Subscribe to onUpdateUser");
        subs.subUpdateUser = API.graphql(
            graphqlOperation(onUpdateUser)
        ).subscribe({
            next: ({provider, value}) => {
                console.log("onUpdateUser", value);
                setChatRoomList((list) => list.map((item) => {
                    const items = item.chatroom.chatRoomUsers.items.map((item) =>
                        (item.user.id === value.data.onUpdateUser.id) ? {
                            ...item,
                            user: {
                                ...item.user,
                                online: value.data.onUpdateUser.online
                            }
                        } : item
                    );
                    return {
                        ...item,
                        chatroom: {
                            ...item.chatroom,
                            chatRoomUsers: {
                                ...item.chatroom.chatRoomUsers,
                                items
                            }
                        }
                    };
                }));

                console.log('chatRoom.users', chatRoom.users);

                // update typing in current chatroom
                setChatRoom((items) => {
                    if (items.users) {
                        const users = items.users.map((item) =>
                            (item.user.id === value.data.onUpdateUser.id) ? {
                                ...item,
                                user: {
                                    ...item.user,
                                    online: value.data.onUpdateUser.online
                                }
                            } : item
                        );
                        return {
                            ...items,
                            users
                        }
                    }
                    return {
                        ...items,
                    }
                });


            },
            error: (error) => console.warn(error),
        });
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

    useEffect(() => {
        // Subscribe to update of chatroom
        subs.subUpdateChatRoom = API.graphql(
            graphqlOperation(onUpdateChatRoom)
        ).subscribe({
            next: ({provider, value}) => {
                console.log("onUpdateChatRoom", value.data.onUpdateChatRoom);
                if (value.data.onUpdateChatRoom.deleted === true) {
                    setChatRoom((item) => {
                        if (item && item.id === value.data.onUpdateChatRoom.id) {
                            setChatRoomID(null);
                            setOpenChat(false);
                            setOpenInfo(false);
                            if (user) {
                                getChatRooms(user.id).then((result) => {
                                    updateChatRoomList(result);
                                });
                            }
                            return {};
                        }
                        return item;
                    });
                    return;
                }

                setChatRoom((item) => {
                    return {
                        ...item,
                        name: value.data.onUpdateChatRoom.name,
                    }
                });
                // Filter non deleted and update chatroom
                setChatRoomList((list) => list.filter((item) => !(item.chatroom.id === value.data.onUpdateChatRoom.id
                    && value.data.onUpdateChatRoom.deleted === true))
                    .map((item) => (item.chatroom.id === value.data.onUpdateChatRoom.id)
                        ? {
                            ...item,
                            chatroom: {
                                ...item.chatroom,
                                lastMessage: value.data.onUpdateChatRoom.lastMessage,
                                newMessages: value.data.onUpdateChatRoom.newMessages,
                                updatedAt: value.data.onUpdateChatRoom.updatedAt,
                                name: value.data.onUpdateChatRoom.name,
                            }
                        }
                        : item));
            },
            error: (error) => console.warn(error),
        });

        // TODO: offline when on browser close
        return () => {
            console.log('UNMOUNTED');
            //unsubscribe
            for (const item in subs) {
                if (subs[item]) {
                    subs[item].unsubscribe();
                }
            }
        };
    }, []);

    //console.log('Rendering index.js');
    return (
        <div className="bg-white flex h-screen overflow-hidden">
            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-hidden">

                <main>
                    <div className="relative flex">
                        {/* Messages sidebar */}
                        <ChatSidebar
                            user={user}
                            chatRoomID={chatRoomID}
                            openChat={openChat}
                            setOpenChat={setOpenChat}
                            chatRoomList={chatRoomList}
                            handleLogout={handleLogout}
                            handleChatRoom={handleChatRoom}
                            handleChatRoomID={handleChatRoomID}
                        />

                        {/* Messages body */}
                        <ChatBody
                            nectus={false}
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
                user={user}
                openInfo={openInfo}
                chatRoom={chatRoom}
                handleCloseInfo={handleCloseInfo}
            />
        </div>
    );
};

export default Chat;
